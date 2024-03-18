import React from "react";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Popconfirm, Tag, message } from "antd";
import { useAppDispatch } from "@/store/store";
import { setAddedCart } from "@/store/slices/customerDetailsSlice";
import { motion } from "framer-motion";

interface CustomerTabAddDrawerItemProps {
  exercise: ExerciseType;
  addIcon: boolean;
}

const CustomerTabAddDrawerItem = ({
  exercise,
  addIcon,
}: CustomerTabAddDrawerItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      key={exercise._id}
      className="flex items-center gap-2 hover:bg-gray-100 p-2 ease-in-out duration-300 rounded-md"
    >
      <Image
        width={80}
        height={80}
        src={`http://localhost:8080${exercise.gifUrl}`}
        alt={exercise.name}
      />
      <p>{exercise.name}</p>
      <Tag color="green">{exercise.bodyPart}</Tag>
      {!addIcon ? (
        <Popconfirm
          title="Are you sure to delete this exercise?"
          onConfirm={() => {
            dispatch(
              setAddedCart({ procesStatus: "delete", exercise: exercise._id })
            );
          }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined
            className="cursor-pointer text-lg"
            style={{ color: "red" }}
          />
        </Popconfirm>
      ) : (
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <PlusCircleOutlined
            className="bg-green-500 p-2 text-white rounded-full cursor-pointer"
            onClick={() => {
              message.success("Exercise Added Check to cart");
              dispatch(setAddedCart(exercise));
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CustomerTabAddDrawerItem;
