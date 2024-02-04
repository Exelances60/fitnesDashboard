"use client";
import React from "react";
import { Card, Grid, Metric } from "@tremor/react";
import Image from "next/image";
import userIcon from "@/../public/dashboard/user.svg";
import orderIcon from "@/../public/dashboard/order.svg";
import salesIcon from "@/../public/dashboard/sales.svg";
import employeeIcon from "@/../public/dashboard/employees.svg";
import { motion } from "framer-motion";

const DndCard = () => {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-2">
      <Card>
        <div className="w-full flex justify-between">
          <p className="text-lg font-semibold text-[#606060]">Total Products</p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
            }}
          >
            <Image src={userIcon} width={50} height={50} alt="total user" />
          </motion.div>
        </div>
        <Metric> 1000</Metric>
      </Card>
      <Card>
        <div className="w-full flex justify-between">
          <p className="text-lg font-semibold text-[#606060]">Total Orders</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
            }}
          >
            <Image
              src={orderIcon}
              width={50}
              height={50}
              alt="total order"
              className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
            />
          </motion.div>
        </div>
        <Metric> 1000</Metric>
      </Card>
      <Card>
        <div className="w-full flex justify-between">
          <p className="text-lg font-semibold text-[#606060]">Total Sales</p>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
            }}
          >
            <Image
              src={salesIcon}
              width={50}
              height={50}
              alt="total sales"
              className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
            />
          </motion.div>
        </div>
        <Metric> 1000</Metric>
      </Card>
      <Card>
        <div className="w-full flex justify-between">
          <p className="text-lg font-semibold text-[#606060]">
            Total Employees
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
          >
            <Image
              src={employeeIcon}
              width={50}
              height={50}
              alt="total employee"
              className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
            />
          </motion.div>
        </div>
        <Metric> 1000</Metric>
      </Card>
    </Grid>
  );
};

export default DndCard;
