import {
  clearAddedCart,
  selectAddedCart,
} from "@/store/slices/customerDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Drawer, Empty } from "antd";
import React, { useState } from "react";
import CustomerTabAddDrawerItem from "./CustomerTabAddDrawerItem";
import useMessage from "@/hooks/useMessage";
import axiosClient from "@/utils/AxiosClient";

interface CustomerTabAddedCartProps {
  addedDrawer: boolean;
  setAddedDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: string;
}

const CustomerTabAddedCart = ({
  addedDrawer,
  setAddedDrawer,
  customerId,
}: CustomerTabAddedCartProps) => {
  const addedCartItem = useAppSelector(selectAddedCart);
  const dispatch = useAppDispatch();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const showMessage = useMessage();

  const handleSave = async () => {
    if (addedCartItem.length <= 0) {
      setAddedDrawer(false);
      return showMessage("Not Added Any Exercise", "info", 1);
    }

    const exerciseNames = addedCartItem.map((item) => item.name);
    const requestBody = { exerciseName: exerciseNames, customerId };

    setLoadingButton(true);
    try {
      const response = await axiosClient.put(
        "/customers/update-customer-plan",
        requestBody
      );
      if (response.status === 200) {
        showMessage("Exercise Added Successfully", "success", 1);
        setAddedDrawer(false);
        dispatch(clearAddedCart());
      }
    } catch (error) {
      showMessage("Error in Adding Exercise", "error", 1);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <Drawer
      title="Add Exercise"
      placement="right"
      closable={true}
      extra={
        <Button onClick={handleSave} type="primary" loading={loadingButton}>
          Save Added Exercise
        </Button>
      }
      onClose={() => setAddedDrawer(false)}
      open={addedDrawer}
    >
      {addedCartItem.length > 0 ? (
        <div className="flex flex-col gap-2">
          {addedCartItem.map((item) => (
            <CustomerTabAddDrawerItem
              key={item._id}
              exercise={item}
              addIcon={false}
            />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Drawer>
  );
};

export default CustomerTabAddedCart;
