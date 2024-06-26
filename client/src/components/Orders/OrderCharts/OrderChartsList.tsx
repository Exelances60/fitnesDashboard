import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import React from "react";

const OrderChartsList = ({ item }: { item: orderDonutChartType }) => {
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <>
      <div className="flex items-center space-x-2.5 truncate">
        <span>-</span>
        <span className="truncate dark:text-dark-tremor-content-emphasis">
          {item.name}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {renderCurrency(item.price)} x {item.amountOrder}
        </span>
        <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
          {renderCurrency(item.totalPrice)}
        </span>
      </div>
    </>
  );
};

export default OrderChartsList;
