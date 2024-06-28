"use client";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { Badge, Card, Grid } from "@tremor/react";
import { useTranslations } from "next-intl";
import React from "react";

interface OrdersCardsProps {
  cardData: CardDataType;
}

const OrdersCards = ({ cardData }: OrdersCardsProps) => {
  const t = useTranslations("Order.OrderCards");
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={3} className="gap-2 ">
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            {t("totalOrders")}
          </p>
          <Badge
            size="lg"
            color={`${
              cardData.increasePercentageForAmount > 0 ? "green" : "red"
            }`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            {cardData.increasePercentageForAmount?.toFixed(2)}%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {cardData.totalOrders} Per
        </p>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            {t("estimedTotalSales")}
          </p>
          <Badge
            size="lg"
            color={`${
              cardData.increasePercentageForSales > 0 ? "green" : "red"
            }`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            {cardData.increasePercentageForSales?.toFixed(2)}%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {renderCurrency(cardData.totalSalesPrice)}
        </p>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            {t("totalComplateSales")}
          </p>
          <Badge
            size="lg"
            color={`${
              cardData.increasePercentageForCompletedSales > 0 ? "green" : "red"
            }`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            {cardData.increasePercentageForCompletedSales.toFixed(2)}%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {renderCurrency(cardData.totalSalesCompleted)}
        </p>
      </Card>
    </Grid>
  );
};

export default OrdersCards;
