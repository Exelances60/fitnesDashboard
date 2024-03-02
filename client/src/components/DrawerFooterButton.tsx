import { Button } from "antd";
import React from "react";

const DrawerFooterButton = ({ formName }: { formName: string }) => {
  return (
    <>
      <Button type="primary" htmlType="submit" form={formName}>
        Submit
      </Button>
    </>
  );
};

export default DrawerFooterButton;
