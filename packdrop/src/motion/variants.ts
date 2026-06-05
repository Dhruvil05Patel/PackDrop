import type { TargetAndTransition } from "framer-motion";

// Centralized motion easing from spec (typed loosely to avoid framer-motion TS strictness)
export const EASING_ENTER = [0.16, 1, 0.3, 1] as const;
export const EASING_EXIT = [0.4, 0, 1, 1] as const;

export const fadeUp: Record<string, TargetAndTransition> = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.22, ease: EASING_ENTER as any },
  },
};

export const scaleIn: Record<string, TargetAndTransition> = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
};

export const staggerContainer: Record<string, TargetAndTransition> = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

export const cardExit: TargetAndTransition = {
  opacity: 0,
  scale: 0.92,
  x: 40,
  filter: "blur(6px)",
  transition: { duration: 0.28, ease: EASING_EXIT as any },
};



