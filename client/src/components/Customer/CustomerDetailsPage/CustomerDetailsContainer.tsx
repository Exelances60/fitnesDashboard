import { Card, Grid } from "@tremor/react";
import { Tabs, TabsProps } from "antd";
import React from "react";
import CustomerPersonalDetails from "./CustomerPersonalDetails/PersonalInfoTab/CustomerPersonalDetails";
import { CustomerType } from "@/types/Customer";
import CustomerDetailsShort from "./CustomerPersonalDetails/PersonalInfoTab/CustomerDetailsShort";
import CustomerExersicesDetails from "./CustomerPersonalDetails/ExersiceTab/CustomerExersicesDetails";

interface CustomerSlugContainerProps {
  customer: CustomerType;
}

const CustomerDetailsContainer = ({ customer }: CustomerSlugContainerProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Details",
      children: <CustomerPersonalDetails customer={customer} />,
    },
    {
      key: "2",
      label: "Exercises Plan",
      children: <CustomerExersicesDetails customer={customer} />,
    },
    {
      key: "3",
      label: "Tab 3",
      children: "children of Tab Pane 3",
    },
  ];

  return (
    <Grid
      numItems={1}
      numItemsSm={1}
      numItemsMd={1}
      numItemsLg={2}
      className="gap-2 "
    >
      <CustomerDetailsShort customer={customer} />
      <Card className="overflow-auto h-[800px]">
        <Tabs items={items} defaultActiveKey="1" />
      </Card>
    </Grid>
  );
};

export default CustomerDetailsContainer;
