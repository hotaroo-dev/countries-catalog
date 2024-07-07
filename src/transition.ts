const opacityVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const bgVariants = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

const tween = {
  type: "tween",
  duration: 0.4,
};

export { opacityVariants, bgVariants, modalVariants, tween };
