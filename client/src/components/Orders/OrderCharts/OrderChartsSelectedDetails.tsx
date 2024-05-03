import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const OrderChartsSelectedDetails = ({
  selected,
}: {
  selected: orderDonutChartType | null;
}) => {
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 10, height: 0 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="flex flex-col items-center mt-8 space-y-2"
        >
          <h4 className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {selected?.name}
          </h4>
          <p className="text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
            {selected ? renderCurrency(selected.totalPrice) : ""}
          </p>
          <p>{selected?.orderId}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderChartsSelectedDetails;
