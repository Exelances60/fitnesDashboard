import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { ordersType } from "@/models/dataTypes";
import { showModal } from "@/store/slices/modalSlice";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import OrderUpdateDrawer from "./OrderModals/OrderUpdateDrawer";
import OrderUpdateDrawerFooter from "./OrderModals/OrderUpdateDrawerFooter";
import OrderDetailModal from "./OrderModals/OrderDetailModal";
import { CheckOutlined } from "@ant-design/icons";

type OrderTableDetailsColProps = {
  record: ordersType;
  handleCompleteOrder: (orderId: string) => void;
};

const OrderTableDetailsCol = ({
  record,
  handleCompleteOrder,
}: OrderTableDetailsColProps) => {
  const dispatch = useAppDispatch();

  const openDetailModal = (selectedOrderFuc: ordersType) => {
    if (selectedOrderFuc) {
      dispatch(
        showModal({
          children: <OrderDetailModal selectedOrder={selectedOrderFuc} />,
          title: "Order Details",
        })
      );
    }
  };

  const openUpdateDrawer = (selectedOrderFuc: ordersType) => {
    if (selectedOrderFuc) {
      dispatch(
        setShowDrawer({
          children: <OrderUpdateDrawer selectedOrder={selectedOrderFuc} />,
          title: "Update Order",
          footer: <OrderUpdateDrawerFooter />,
        })
      );
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        type="primary"
        onClick={() => {
          openDetailModal(record);
        }}
      >
        Details
      </Button>
      <Button
        type="primary"
        ghost
        onClick={() => {
          openUpdateDrawer(record);
        }}
      >
        Update
      </Button>
      <Button
        type="primary"
        ghost
        icon={<CheckOutlined />}
        style={{
          backgroundColor: "#2dc56c",
          color: "white",
          borderColor: "#2dc56c",
        }}
        onClick={() => {
          handleCompleteOrder(record._id);
        }}
      >
        Complete
      </Button>
    </div>
  );
};

export default OrderTableDetailsCol;
