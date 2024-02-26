"use client";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { motion } from "framer-motion";
const mockData = [
  {
    id: 1,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 2,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 3,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 4,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 5,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 6,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 7,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 8,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },

  {
    id: 9,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 10,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 11,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 12,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 13,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 14,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
  {
    id: 15,
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port",
    bodyPart: "Chest",
  },
];

const CustomerExerciseTrainer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Button type="primary" onClick={() => setOpen(true)}>
        Assign Trainer
      </Button>
      <Drawer
        title="Assign Trainer"
        placement="right"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {mockData.map((data) => (
            <motion.div key={data.id} className="flex items-center gap-2">
              <img
                src={data.imageUrl}
                alt="trainer"
                className="rounded-full"
                width={50}
                height={50}
              />
              <p>{data.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </Drawer>
    </div>
  );
};

export default CustomerExerciseTrainer;
