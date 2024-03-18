import { currencyFormatter } from "@/utils/utils";
import { motion } from "framer-motion";
import React from "react";

const OrderChartsSelectedDetails = ({
  selected,
}: {
  selected: orderDonutChartType;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center mt-8 space-y-2"
    >
      <h4 className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {selected.name}
      </h4>
      <p className="text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
        {currencyFormatter(selected.totalPrice)}
      </p>
      <p>{selected.orderId}</p>
    </motion.div>
  );
};

export default OrderChartsSelectedDetails;
