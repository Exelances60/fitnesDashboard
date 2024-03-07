"use client";
import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Tag } from "antd";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/utils/utils";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { motion } from "framer-motion";

interface CustomerExerciseItemProps {
  exercise: ExerciseType;
  customerId: string;
  deleteMood: boolean;
}

const CustomerExerciseItem = ({
  exercise,
  customerId,
  deleteMood,
}: CustomerExerciseItemProps) => {
  const deleteMoodVariant = {
    false: { opacity: 0, scale: 0, y: -10 },
    true: { opacity: 1, scale: 1, y: 0 },
  };
  const showMessage = useMessage();

  const renderInstructions = () => (
    <>
      <h1 className="text-lg font-bold">Instructions</h1>
      {exercise.instructions.map((instruction, index) => (
        <p key={index}>{instruction}</p>
      ))}
    </>
  );

  const deleteExercise = async () => {
    showMessage("Deleting Exercise", "loading", 2);
    try {
      const response = await axiosClient.put(
        `/customers/delete-customer-exercise-plan`,
        {
          customerId: customerId,
          exerciseName: exercise.name,
        }
      );
      if (response.status === 200) {
        showMessage("Exersice Deleted", "success", 1);
      }
    } catch (error) {
      showMessage("Error Deleting Exercise", "error", 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 hover:bg-gray-200 rounded-md p-2 ease-in duration-300">
      <div className="flex gap-2 items-center">
        <div className="md:w-16 h-16 w-24 relative overflow-auto hover:scale-110 transform duration-300 ease-in-out">
          <Image
            src={`http://localhost:8080${exercise.gifUrl}`}
            layout="fill"
            alt={exercise.name}
            className="rounded-md"
            quality={70}
            unoptimized={true}
          />
        </div>
        <p className="text-sm">{capitalizeFirstLetter(exercise.name)}</p>

        <motion.div
          initial={false}
          animate={deleteMood ? "true" : "false"}
          variants={deleteMoodVariant}
          className="flex gap-2"
        >
          <Popconfirm
            title="Are you sure to delete this exercise?"
            onConfirm={deleteExercise}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-lg cursor-pointer text-red-500 hover:text-red-600 hover:scale-110 transform transition duration-300 ease-in-out" />
          </Popconfirm>
        </motion.div>
      </div>

      <div className="flex gap-2">
        <Tag color="blue">{exercise.equipment} </Tag>
        <Tag color="green">{exercise.secondaryMuscle.join(", ")} </Tag>
        <Tag color="purple">{exercise.bodyPart} </Tag>
      </div>

      <div className="flex gap-4">
        <p className="text-sm">{renderInstructions()}</p>
      </div>
    </div>
  );
};

export default CustomerExerciseItem;
