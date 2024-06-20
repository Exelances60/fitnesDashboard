import React from "react";
import AREACHARTSIMG from "@/../public/dashboard/area-chart.webp";
import BARCHARTSIMG from "@/../public/dashboard/bar-chart.webp";
import LINECHARTSIMG from "@/../public/dashboard/line-chart.webp";
import PRODUCTTABLE from "@/../public/dashboard/product-table.png";
import ORDERTABLE from "@/../public/dashboard/order-table.png";
import EMPLOYEESTABLE from "@/../public/dashboard/employees-table.png";
import CUSTOMERTABLE from "@/../public/dashboard/customer-table.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";
import { Divider } from "antd";
import { setChartsMode, setFastTable } from "@/store/slices/dashboardSlice";

const data = [
  {
    title: "Area Chart",
    image: AREACHARTSIMG,
    value: "area",
  },
  {
    title: "Bar Chart",
    image: BARCHARTSIMG,
    value: "bar",
  },
  {
    title: "Line Chart",
    image: LINECHARTSIMG,
    value: "line",
  },
];

const DashboardSelect = () => {
  const dispatch = useAppDispatch();
  const fastTable = [
    {
      title: "Product Table",
      image: PRODUCTTABLE,
      value: "product",
    },
    {
      title: "Order Table",
      image: ORDERTABLE,
      value: "order",
    },
    {
      title: "Employee Table",
      image: EMPLOYEESTABLE,
      value: "employee",
    },
    {
      title: "Customer Table",
      image: CUSTOMERTABLE,
      value: "customer",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-50 min-h-screen shadow-md">
      <h1 className="text-xl font-bold text-gray-900 ">Select Chart Type</h1>
      {data.map((item, index) => (
        <motion.div
          initial={{ x: 150, opacity: 0.3 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          key={index}
          className="flex items-center bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300"
          onClick={() => {
            dispatch(setChartsMode(item.value));
            dispatch(setHideDrawer());
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={150}
            height={200}
            className="rounded-lg shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600">Click to view {item.title}</p>
          </div>
        </motion.div>
      ))}
      <Divider />
      <h1 className="text-xl font-bold text-gray-900 ">Fast Table View</h1>
      <p className="text-gray-600 mb-4">
        Choose the fast table of the menus to view the data
      </p>
      {fastTable.map((item, index) => (
        <motion.div
          initial={{ x: 150, opacity: 0.3 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.12, duration: 0.5 }}
          key={index}
          className="flex items-center bg-white rounded-lg shadow-lg p-5 cursor-pointer hover:scale-105 transform transition duration-300"
          onClick={() => {
            dispatch(setHideDrawer());
            dispatch(setFastTable(item.value));
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={130}
            height={200}
            className="rounded-lg shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600">Click to view {item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardSelect;
