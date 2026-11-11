import {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring, useReducedMotion} from 'motion/react';
import {useCursor} from '../context/CursorContext';

export function CustomCursor() {
  const {cursorType, cursorText} = useCursor();
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for outer cursor
  const springConfig = {damping: 24, stiffness: 280, mass: 0.5};
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setIsVisible(false);
        return;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, {passive: true});
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || prefersReduced) {
    return null;
  }

  const displayText =
    cursorText ||
    (cursorType === 'project'
      ? 'VIEW PROJECT'
      : cursorType === 'contact'
      ? "LET'S TALK"
      : cursorType === 'drag'
      ? 'DRAG'
      : '');

  const isExpanded = cursorType !== 'default';
  const hasText = displayText.length > 0;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Central pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#087BFF] shadow-[0_0_10px_#00D5FF]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && !hasText ? 1 : 0,
        }}
        transition={{duration: 0.1}}
      />

      {/* Outer interactive ring / badge */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center transition-colors duration-200 ${
          hasText
            ? 'px-3.5 py-1.5 rounded-full bg-[#101426]/95 text-white shadow-[0_10px_30px_rgba(8,123,255,0.4)] border border-[#00D5FF]/50 backdrop-blur-md'
            : isExpanded
            ? 'w-12 h-12 rounded-full border-2 border-[#087BFF]/70 bg-[#087BFF]/10 backdrop-blur-[2px]'
            : 'w-9 h-9 rounded-full border border-[#101426]/30 dark:border-white/40 bg-transparent'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isExpanded ? 1.15 : 1,
        }}
        transition={{type: 'spring', damping: 20, stiffness: 300}}
      >
        {hasText && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#00D5FF] whitespace-nowrap select-none">
            {displayText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
