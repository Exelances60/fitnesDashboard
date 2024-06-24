"use client";
import React, { useRef, useCallback } from "react";
import { capitalizeFirstLetter } from "@/utils/utils";
import CustomerExerciseItem from "./CustomerExerciseItem";
import { Empty, FloatButton, Popover, Tooltip, message } from "antd";
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
import { useReactToPrint } from "react-to-print";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";

interface CustomerExerciseListProps {
  bodyPart: { [bodyPart: string]: ExerciseType[] };
  customer: CustomerType;
}

const CustomerExerciseList: React.FC<CustomerExerciseListProps> = ({
  bodyPart,
  customer,
}) => {
  const dispatch = useAppDispatch();
  const deleteMood = useAppSelector(selectDeleteMood);
  const logginUserToken = useGetTokenPayload();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Exercise",
  });

  const isAuthorized = useCallback(() => {
    return (
      logginUserToken?.role === "owner" ||
      logginUserToken?._id ===
        (typeof customer.coachPT === "string"
          ? customer.coachPT
          : customer.coachPT?._id)
    );
  }, [logginUserToken, customer.coachPT]);

  const toggleDeleteMode = useCallback(() => {
    if (!isAuthorized()) {
      message.error({
        content: "You are not authorized to delete the exercise 🚫",
        key: "deleteMode",
      });
      return;
    }
    const newDeleteMood = !deleteMood;
    message[newDeleteMood ? "success" : "error"]({
      content: `Delete mode ${newDeleteMood ? "ON" : "OFF"} 🗑`,
      key: "deleteMode",
    });
    dispatch(setDeleteMood(newDeleteMood));
  }, [deleteMood, dispatch, isAuthorized]);

  const openAddExerciseModal = useCallback(() => {
    dispatch(
      setShowDrawer({
        children: <CustomerTabExerciseAddDrawer customer={customer} />,
        title: "Add Exercise",
        footer: null,
      })
    );
  }, [customer, dispatch]);

  const renderBodyParts = useCallback(() => {
    return Object.entries(bodyPart).map(([part, exercises]) => (
      <div key={part}>
        <h3 className="text-xl">{capitalizeFirstLetter(part)}</h3>
        {exercises.map((exercise) => (
          <CustomerExerciseItem
            key={exercise._id}
            exercise={exercise}
            customerId={customer._id}
            deleteMood={deleteMood}
          />
        ))}
      </div>
    ));
  }, [bodyPart, customer._id, deleteMood]);

  return (
    <>
      <div className="flex gap-2 p-2">
        <span
          className="text-lg cursor-pointer hover:scale-105 ease-in duration-300"
          onClick={handlePrint}
        >
          <Popover content="Print the exercise">🖨</Popover>
        </span>
        <span className="text-lg cursor-pointer">Print the exercise</span>
      </div>
      <div className="p-2 flex flex-col gap-2" ref={componentRef}>
        {Object.entries(bodyPart).length > 0 ? (
          renderBodyParts()
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Exercise Found"
          />
        )}

        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
                onClick={toggleDeleteMode}
              />
            </Tooltip>
          </FloatButton.Group>
        </motion.div>
      </div>
    </>
  );
};

export default CustomerExerciseList;
