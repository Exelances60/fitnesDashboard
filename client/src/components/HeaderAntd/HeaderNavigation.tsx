import React from "react";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { motion } from "framer-motion";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuProps } from "antd/lib";

const HeaderNavigation = () => {
  const onCurrencyChange = (currency: string) => {
    console.log(currency);
  };
  const moneyChangeDropdown: MenuProps["items"] = [
    {
      label: <div className="flex items-center gap-5">💵 Dollars (USD)</div>,
      key: "USD",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
    },
    {
      label: <div className="flex items-center gap-5">💶 Euros (EUR)</div>,
      key: "EUR",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
    },
    {
      label: <div className="flex items-center gap-5">💴 Yen (JPY)</div>,
      key: "JPY",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
    },
    {
      label: <div className="flex items-center gap-5">₺ Türk Lirası (TRY)</div>,
      key: "TRY",
      onClick: (info: MenuInfo) => onCurrencyChange(info.key),
    },
  ];
  return (
    <div className="flex items-center gap-5">
      <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-5">
        <Dropdown menu={{ items: moneyChangeDropdown }} trigger={["click"]}>
          <MoneyCollectOutlined className="text-2xl" />
        </Dropdown>
      </motion.div>
    </div>
  );
};

export default HeaderNavigation;
