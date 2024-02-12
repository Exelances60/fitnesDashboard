import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";

const OrderUpdateDrawerFooter = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="primary"
        htmlType="submit"
        className="p-5 box-border"
        size="middle"
        form="updateOrderForm"
      >
        Update Order
      </Button>
      <Button
        type="default"
        className="p-5 box-border"
        size="middle"
        onClick={() => dispatch(setHideDrawer())}
      >
        Cancel
      </Button>
    </div>
  );
};

export default OrderUpdateDrawerFooter;
