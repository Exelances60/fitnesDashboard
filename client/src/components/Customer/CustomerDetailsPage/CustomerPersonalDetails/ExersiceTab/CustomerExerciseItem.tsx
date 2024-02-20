"use client";
import React from "react";
import { ExerciseType } from "@/types/ExercisType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/utils/utils";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";

const CustomerExerciseItem = ({
  exercise,
  customerId,
}: {
  exercise: ExerciseType;
  customerId: string;
}) => {
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
        showMessage("Exersice Deleted", "success", 2);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-2 hover:bg-gray-200 rounded-md p-2 ease-in duration-300">
      <div className="flex gap-2 items-center">
        <div className="md:w-16 h-16 w-96 relative overflow-auto hover:scale-110 transform duration-300 ease-in-out">
          <Image
            src={`https://fitnesdashboard.onrender.com${exercise.gifUrl}`}
            layout="fill"
            alt={exercise.name}
            className="rounded-md"
            quality={70}
            unoptimized={true}
          />
        </div>
        <p className="text-sm">{capitalizeFirstLetter(exercise.name)}</p>
        <DeleteOutlined
          twoToneColor="#eb2f38"
          onClick={deleteExercise}
          className="text-lg cursor-pointer text-red-500 hover:text-red-600 hover:scale-110 transform transition duration-300 ease-in-out"
        />
      </div>

      <div className="flex gap-2">
        <Tag color="blue">{exercise.equipment} </Tag>
        <Tag color="green">{exercise.secondaryMuscle.join(", ")} </Tag>
        <Tag color="purple">{exercise.bodyPart} </Tag>
      </div>

      <div className="flex gap-4">
        <p className="text-sm">{renderInstructions()}</p>
        <EditOutlined className="text-blue-500 cursor-pointer hover:text-blue-600 hover:scale-110 transform transition duration-300 ease-in-out text-xl" />
      </div>
    </div>
  );
};

export default CustomerExerciseItem;
