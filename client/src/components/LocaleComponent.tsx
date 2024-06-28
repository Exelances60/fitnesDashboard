"use client";
import React from "react";
import { TranslationOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import US from "@/../public/dashboard/US.svg";
import TR from "@/../public/dashboard/TR.svg";
import Image from "next/image";
import { setLocale } from "@/actions/SetLocale";
import { getCookie } from "cookies-next";

const LocaleComponent = () => {
  const currentLocale = getCookie("locale");
  const content = (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div
        className="flex gap-2 hover:bg-gray-200 w-full p-2 cursor-pointer rounded-lg ease-in-out duration-300"
        style={{ backgroundColor: currentLocale === "tr" ? "#c2c2c2" : "" }}
        onClick={() => setLocale("tr")}
      >
        <Image src={TR} alt="TR" width={20} height={20} />
        <p>Türkçe</p>
      </div>
      <div
        className="flex gap-2 hover:bg-gray-200 w-full p-2 cursor-pointer rounded-lg ease-in-out duration-300"
        style={{ backgroundColor: currentLocale === "en" ? "#c2c2c2" : "" }}
        onClick={() => setLocale("en")}
      >
        <Image src={US} alt="US" width={20} height={20} />
        <p>English</p>
      </div>
    </div>
  );

  return (
    <>
      <Popover content={content}>
        <TranslationOutlined className="text-2xl cursor-pointer" />
      </Popover>
    </>
  );
};

export default LocaleComponent;
