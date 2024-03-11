"use client";
import { Button, Drawer, Image, Popconfirm, message } from "antd";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchEmplooyes } from "@/actions/fetchEmployees";
import { ProgressCircle } from "@tremor/react";
import { capitalizeFirstLetter } from "@/utils/utils";
import { PlusCircleOutlined } from "@ant-design/icons";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";

interface CustomerExerciseTrainerProps {
  customerId: string;
}

const CustomerExerciseTrainer = ({
  customerId,
}: CustomerExerciseTrainerProps) => {
  const showMessage = useMessage();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IEmployee[]>([]);

  const getTrainers = async () => {
    message.loading({ content: "Loading Trainers", key: "trainer" });
    setOpen(true);
    try {
      const { employees } = await fetchEmplooyes();
      setData(employees);
      message.success({ content: "Trainers Loaded", key: "trainer" });
    } catch (error) {
      message.error({ content: "Failed to load Trainers", key: "trainer" });
    }
  };

  const assignTrainer = async (employeeId: string) => {
    showMessage("Assigning Trainer", "loading");
    try {
      const bodyValues = {
        employeeId,
        customerId,
      };
      const response = await axiosClient.post(
        "/employees/assignCustomer",
        bodyValues
      );
      if (response.status === 200) {
        showMessage("Trainer Assigned Successfully", "success");
        setOpen(false);
      }
    } catch (error) {
      showMessage("Failed to Assign Trainer", "error");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button type="primary" onClick={getTrainers} size="small">
        Assign Trainer
      </Button>
      <Drawer
        title="Assign Trainer"
        placement="right"
        closable={false}
        onClose={() => setOpen(false)}
        extra={
          <Button type="primary" ghost onClick={() => setOpen(false)}>
            Close
          </Button>
        }
        open={open}
      >
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {data.length > 0 ? (
            data.map((trainer) => {
              if (trainer.position === "Tranier") {
                return (
                  <div key={trainer._id} className="flex gap-2 items-center">
                    <Image
                      src={`https://fitnesdashboard.onrender.com/${trainer.profilePicture}`}
                      width={50}
                      height={50}
                      className="rounded-md"
                      alt="trainer"
                    />
                    <div>
                      <p>{capitalizeFirstLetter(trainer.name)}</p>
                      <p className="text-sm text-gray-400">
                        {trainer.position}
                      </p>
                      <p className="text-sm text-gray-400">{trainer.phone}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Popconfirm
                        title="Are you sure? Assign this Trainer?"
                        onConfirm={() => {
                          assignTrainer(trainer._id);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <PlusCircleOutlined className="text-green-500" />
                      </Popconfirm>
                    </motion.div>
                  </div>
                );
              }
            })
          ) : (
            <ProgressCircle />
          )}
        </motion.div>
      </Drawer>
    </div>
  );
};

export default CustomerExerciseTrainer;
