"use client";
import React from "react";
import { ExerciseType } from "@/types/ExercisType";
import { capitalizeFirstLetter } from "@/utils/utils";
import CustomerExerciseItem from "./CustomerExerciseItem";
import { Empty, FloatButton, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  FormOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import {
  selectDeleteMood,
  setDeleteMood,
} from "@/store/slices/customerDetailsSlice";
import CustomerTabExerciseAddDrawer from "./CustomerTabExerciseAddDrawer";
import { motion } from "framer-motion";

const CustomerExerciseList = ({
  bodyPart,
  customerId,
}: {
  bodyPart: { [bodyPart: string]: ExerciseType[] };
  customerId: string;
}) => {
  const dispatch = useAppDispatch();
  const deleteMood = useAppSelector(selectDeleteMood);
  const openAddExerciseModal = () => {
    dispatch(
      setShowDrawer({
        children: <CustomerTabExerciseAddDrawer customerId={customerId} />,
        title: "Add Exercise",
        footer: null,
      })
    );
  };

  return (
    <div className="p-2">
      {Object.entries(bodyPart).length > 0 ? (
        Object.entries(bodyPart).map(([part, exercises]) => (
          <div key={part}>
            <h3 className="text-xl">{capitalizeFirstLetter(part)}</h3>
            {exercises.map((exercise) => (
              <CustomerExerciseItem
                key={exercise._id}
                exercise={exercise}
                customerId={customerId}
                deleteMood={deleteMood}
              />
            ))}
          </div>
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Exercise Found"
        />
      )}

      <motion.div
        animate={{
          opacity: 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <FloatButton.Group
          trigger="click"
          style={{ right: 60 }}
          icon={<FormOutlined />}
        >
          <Tooltip title="Add Exercise">
            <FloatButton
              icon={<PlusCircleOutlined />}
              onClick={openAddExerciseModal}
            />
          </Tooltip>
          <Tooltip title="Delete Mode">
            <FloatButton
              icon={<DeleteOutlined />}
              onClick={() => {
                dispatch(setDeleteMood(!deleteMood));
              }}
            />
          </Tooltip>
        </FloatButton.Group>
      </motion.div>
    </div>
  );
};

export default CustomerExerciseList;
