import {useEffect, useState} from 'react';
import {motion, AnimatePresence, useReducedMotion} from 'motion/react';
import {BrandMark} from './GeometricArt';

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 550);
    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-[#F5F7FA]"
          aria-hidden="true"
        >
          <motion.div
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 1.04, opacity: 0}}
            transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col items-center gap-4"
          >
            <BrandMark className="w-12 h-12" />
            <div className="w-40 h-1 rounded-full bg-[#101426]/10 overflow-hidden">
              <motion.div
                initial={{scaleX: 0}}
                animate={{scaleX: 1}}
                transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                style={{transformOrigin: 'left'}}
                className="h-full w-full bg-gradient-to-r from-[#087BFF] via-[#792BFF] to-[#FF8A24]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
