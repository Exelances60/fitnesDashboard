"use client";
import useMessage from "@/hooks/useMessage";
import axiosClient from "@/utils/AxiosClient";
import { Button, Popconfirm } from "antd";
import React from "react";

interface CustomerExersiceRemoveCoachButtonProps {
  customerId: string;
}

const CustomerExersiceRemoveCoachButton = ({
  customerId,
}: CustomerExersiceRemoveCoachButtonProps) => {
  const showMessage = useMessage();

  const handleRemoveCoach = async () => {
    showMessage("Removing coach...", "info");
    try {
      const response = await axiosClient.delete(
        "/customers/remove-customer-coach",
        {
          data: {
            customerId,
          },
        }
      );

      showMessage(response.data.message, "success");
    } catch (error) {
      showMessage("Failed to remove coach", "error");
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to remove the coach?"
      okText="Yes"
      cancelText="No"
      onConfirm={handleRemoveCoach}
    >
      <Button type="primary" danger size="small">
        Remove Coach
      </Button>
    </Popconfirm>
  );
};

export default CustomerExersiceRemoveCoachButton;
