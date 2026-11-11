import React, {useRef, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {useCursor, type CursorType} from '../context/CursorContext';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  cursorType?: CursorType;
  cursorText?: string;
  onClick?: (e: React.MouseEvent) => void;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export function Magnetic({
  children,
  className = '',
  strength = 0.35,
  cursorType = 'hover',
  cursorText,
  onClick,
  as = 'div',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({x: 0, y: 0});
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReduced || e.pointerType === 'touch' || !ref.current) return;
    const {clientX, clientY} = e;
    const {left, top, width, height} = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handlePointerLeave = () => {
    setPosition({x: 0, y: 0});
    resetCursor();
  };

  const handlePointerEnter = () => {
    setCursor(cursorType, cursorText);
  };

  const motionProps = {
    animate: {x: position.x, y: position.y},
    transition: {type: 'spring' as const, damping: 15, stiffness: 240, mass: 0.2},
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    onPointerEnter: handlePointerEnter,
    className: `inline-block ${className}`,
    'aria-label': ariaLabel,
  };

  if (as === 'button') {
    return (
      <motion.button
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div ref={ref} onClick={onClick} {...motionProps}>
      {children}
    </motion.div>
  );
}
