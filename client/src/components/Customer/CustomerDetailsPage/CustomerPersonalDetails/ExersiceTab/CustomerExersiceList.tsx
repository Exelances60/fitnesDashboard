"use client";
import React from "react";
import { ExerciseType } from "@/types/ExercisType";
import { capitalizeFirstLetter } from "@/utils/utils";
import CustomerExerciseItem from "./CustomerExerciseItem";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { showModal } from "@/store/slices/modalSlice";
import CustomerTabExerciseAddModal from "./CustomerTabExerciseAddModal";

const CustomerExerciseList = ({
  bodyPart,
  customerId,
}: {
  bodyPart: { [bodyPart: string]: ExerciseType[] };
  customerId: string;
}) => {
  const dispatch = useAppDispatch();

  const openAddExerciseModal = () => {
    dispatch(
      showModal({
        children: <CustomerTabExerciseAddModal />,
        title: "Add Exercise",
        footer: null,
      })
    );
  };

  return (
    <div className="p-2">
      <Button type="primary" className="p-5" onClick={openAddExerciseModal}>
        Add to Plan
      </Button>
      {Object.entries(bodyPart).map(([part, exercises]) => (
        <div key={part}>
          <h3 className="text-xl">{capitalizeFirstLetter(part)}</h3>
          {exercises.map((exercise) => (
            <CustomerExerciseItem
              key={exercise._id}
              exercise={exercise}
              customerId={customerId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomerExerciseList;
