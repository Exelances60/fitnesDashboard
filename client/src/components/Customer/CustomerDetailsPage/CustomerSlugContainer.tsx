import { Card, Grid } from "@tremor/react";
import { Button, Tabs, TabsProps } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
import CustomerPersonalDetails from "./CustomerPersonalDetails/CustomerPersonalDetails";
import { CustomerType } from "@/types/Customer";
import Image from "next/image";
import CustomerDetailsShort from "./CustomerPersonalDetails/CustomerDetailsShort";

interface CustomerSlugContainerProps {
  customer: CustomerType;
}

const CustomerSlugContainer = ({ customer }: CustomerSlugContainerProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Details",
      children: <CustomerPersonalDetails customer={customer} />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "children of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "children of Tab Pane 3",
    },
  ];

  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-2">
      <CustomerDetailsShort customer={customer} />
      <Card>
        <Tabs items={items} defaultActiveKey="1" />
      </Card>
    </Grid>
  );
};

export default CustomerSlugContainer;
