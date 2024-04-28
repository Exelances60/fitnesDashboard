import React from "react";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { motion } from "framer-motion";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuProps } from "antd/lib";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { changeCurrency, selectCurrency } from "@/store/slices/navigationSlice";

const NavigationCurrency = () => {
  const currentCurrency = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
  const onCurrencyChange = (currency: string) => {
    dispatch(changeCurrency(currency));
  };
  const moneyChangeDropdown: MenuProps["items"] = [
    {
      label: <div className="flex items-center gap-5">💵 Dollars (USD)</div>,
      key: "USD",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
      disabled: currentCurrency === "USD",
    },
    {
      label: <div className="flex items-center gap-5">💶 Euros (EUR)</div>,
      key: "EUR",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
      disabled: currentCurrency === "EUR",
    },
    {
      label: <div className="flex items-center gap-5">💴 Yen (JPY)</div>,
      key: "JPY",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
      disabled: currentCurrency === "JPY",
    },
    {
      label: <div className="flex items-center gap-5">₺ Türk Lirası (TRY)</div>,
      key: "TRY",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
      disabled: currentCurrency === "TRY",
    },
  ];
  return (
    <>
      <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-5">
        <Dropdown menu={{ items: moneyChangeDropdown }} trigger={["click"]}>
          <MoneyCollectOutlined className="text-2xl" />
        </Dropdown>
      </motion.div>
    </>
  );
};

export default NavigationCurrency;
