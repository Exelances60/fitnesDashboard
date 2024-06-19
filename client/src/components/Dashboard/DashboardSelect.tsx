import React from "react";
import AREACHARTSIMG from "@/../public/dashboard/area-chart.webp";
import BARCHARTSIMG from "@/../public/dashboard/bar-chart.webp";
import LINECHARTSIMG from "@/../public/dashboard/line-chart.webp";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";

interface DashboardSelectProps {
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
}

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

const DashboardSelect = ({ setSelectedView }: DashboardSelectProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col space-y-4 p-4">
      {data.map((item, index) => (
        <motion.div
          initial={{ x: 150, opacity: 0.3 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.15, duration: 0.2 }}
          key={index}
          className="w-full flex items-center bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300"
          onClick={() => {
            setSelectedView(item.value);
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
          <div className="ml-4">
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
