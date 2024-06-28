"use client";
import React from "react";
import { selectCurrency } from "@/store/slices/navigationSlice";
import { useAppSelector } from "@/store/store";
import { useFormatter } from "next-intl";

const useCurrencyFormatter = () => {
  const format = useFormatter();
  const currentCurrency = useAppSelector(selectCurrency);
  const currentCurrencySymbol =
    currentCurrency === "USD"
      ? "$"
      : currentCurrency === "EUR"
      ? "€"
      : currentCurrency === "JPY"
      ? "¥"
      : "₺";
  const renderCurrency = (number: number) => {
    return format.number(number, {
      style: "currency",
      currency: currentCurrency,
    });
  };

  return { renderCurrency, currentCurrencySymbol };
};

export default useCurrencyFormatter;
