import { Card } from "@tremor/react";

import React from "react";
import CustomerContainerHeader from "./CustomerContainerHeader";

const CustomerContainer = () => {
  return (
    <Card className="overflow-auto">
      <CustomerContainerHeader />
    </Card>
  );
};

export default CustomerContainer;
