"use client";
import React from "react";
import { selectCurrency } from "@/store/slices/navigationSlice";
import { useAppSelector } from "@/store/store";

const useCurrencyFormatter = () => {
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
    return Intl.NumberFormat("default", {
      style: "currency",
      currency: currentCurrency,
    }).format(number);
  };

  return { renderCurrency, currentCurrencySymbol };
};

export default useCurrencyFormatter;
