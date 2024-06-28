import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";
import { useTranslations } from "next-intl";

const OrderUpdateDrawerFooter = () => {
  const t = useTranslations("Order.OrderContainer");
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
        {t("updateOrder")}
      </Button>
      <Button
        type="default"
        className="p-5 box-border"
        size="middle"
        onClick={() => dispatch(setHideDrawer())}
      >
        {t("cancel")}
      </Button>
    </div>
  );
};

export default OrderUpdateDrawerFooter;
