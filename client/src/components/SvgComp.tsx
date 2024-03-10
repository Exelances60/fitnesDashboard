"use client";
import React from "react";
import { motion } from "framer-motion";

const svgVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const SvgComp = () => {
  return (
    <div className="md:block hidden">
      <motion.svg
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        viewBox="0 0 584 396"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 lg:w-[584px] lg:h-[396px] w-[300px] h-[200px]"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M8.46902 -208.915C-41.4966 74.4538 147.714 344.675 431.083 394.64C582.571 421.352 521.438 33.6298 633.769 -54.2125C731.56 -130.685 1011.38 103.907 1034.64 -27.9738C1084.6 -311.343 895.393 -581.564 612.025 -631.529C328.656 -681.495 58.4346 -492.284 8.46902 -208.915Z"
          fill="#2869ff"
        />
      </motion.svg>

      <motion.svg
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        viewBox="0 0 821 611"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 lg:w-[821px] lg:h-[611px] w-[300px] h-[250px]"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M219.512 -233.946C-12.7303 -149.417 -132.476 107.378 -47.9461 339.62C-2.75693 463.777 259.396 251.791 372.979 297.623C471.861 337.522 417.534 646.419 525.62 607.079C757.863 522.55 877.608 265.755 793.079 33.5125C708.549 -198.73 451.755 -318.475 219.512 -233.946Z"
          fill="#2869ff"
        />
      </motion.svg>

      <motion.svg
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        viewBox="0 0 720 585"
        fill="none"
        className="absolute bottom-0 left-0 lg:w-[720px] lg:h-[585px] w-[300px] h-[250px] "
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M272.5 895C519.647 895 720 694.647 720 447.5C720 315.376 401.153 424.916 310.095 343C230.823 271.687 387.523 0 272.5 0C25.3526 0 -175 200.353 -175 447.5C-175 694.647 25.3526 895 272.5 895Z"
          fill="#2869ff"
        />
      </motion.svg>
      <motion.svg
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        viewBox="0 0 575 706"
        fill="none"
        className="absolute bottom-0 right-0  lg:w-[575px] lg:h-[706px] w-[300px] h-[300px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M1141.38 667.96C1196.52 355.221 987.699 56.9921 674.96 1.84774C507.77 -27.6323 575.24 400.276 451.267 497.223C343.34 581.622 34.5121 322.715 8.8477 468.264C-46.2967 781.004 162.525 1079.23 475.264 1134.38C788.004 1189.52 1086.23 980.699 1141.38 667.96Z"
          fill="#2869ff"
        />
      </motion.svg>
    </div>
  );
};

export default SvgComp;
