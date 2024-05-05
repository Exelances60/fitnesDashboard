"use client";
import React from "react";
import Image from "next/image";
import PLACEHOLDERIMAGE from "@/../public/dashboard/placeholder.svg";
import { Avatar, Statistic } from "antd";
import {
  UserOutlined,
  AntDesignOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const LoginRightSide = () => {
  return (
    <div className="relative hidden md:flex flex-auto items-center justify-center h-full overflow-hidden">
      <Image
        src={PLACEHOLDERIMAGE}
        alt="placeholder"
        fill
        className="resim"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0  bg-black bg-opacity-60 flex items-end p-5 font-Poppins text-white">
        <motion.div
          whileHover="hover"
          variants={{
            hover: {
              padding: 10,
              transition: { duration: 0.5, ease: "backInOut" },
            },
          }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            when: "afterChildren",
            staggerChildren: 0.5,
          }}
          className="h-80 w-full flex flex-col justify-end"
        >
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold "
          >
            Welcome Back the Dashboard
          </motion.h1>
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }}
            className="text-md text-gray-300"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quidem, doloribus, quae voluptates fugit, autem
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-2 mt-5"
          >
            <Avatar.Group
              maxCount={5}
              maxPopoverTrigger="click"
              className="cursor-pointer"
            >
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#f56a00" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
            <Statistic
              value={1128}
              className="py-5"
              valueStyle={{ color: "#ffffff" }}
              prefix={<LikeOutlined />}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginRightSide;
