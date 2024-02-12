import React from "react";
import { Button } from "antd";

const CustomerAddModalFooter = () => {
  return (
    <>
      <Button
        type="primary"
        form="customerAddForm"
        key="submit"
        htmlType="submit"
      >
        Add Customer
      </Button>
    </>
  );
};

export default CustomerAddModalFooter;
