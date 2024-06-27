import { Card, Grid } from "@tremor/react";
import { Tabs, TabsProps } from "antd";
import React from "react";
import CustomerPersonalDetails from "./CustomerPersonalDetails/PersonalInfoTab/CustomerPersonalDetails";
import CustomerDetailsShort from "./CustomerPersonalDetails/PersonalInfoTab/CustomerDetailsShort";
import CustomerExersicesDetails from "./CustomerPersonalDetails/ExersiceTab/CustomerExersicesDetails";
import {
  ContactsOutlined,
  FolderOpenOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import CustomerDetailsStatic from "./CustomerPersonalDetails/StaticsticTab/CustomerDetailsStatic";

interface CustomerSlugContainerProps {
  customer: CustomerType;
}

const CustomerDetailsContainer = ({ customer }: CustomerSlugContainerProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Details",
      children: <CustomerPersonalDetails customer={customer} />,
      icon: <ContactsOutlined className="text-lg" />,
    },
    {
      key: "2",
      label: "Exercises Plan",
      children: <CustomerExersicesDetails customer={customer} />,
      icon: <FolderOpenOutlined className="text-lg" />,
    },
    {
      key: "3",
      label: "Statistics",
      children: <CustomerDetailsStatic customer={customer} />,
      icon: <AreaChartOutlined className="text-lg" />,
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
      <Card className="overflow-auto h-[850px]">
        <Tabs items={items} defaultActiveKey="1" />
      </Card>
    </Grid>
  );
};

export default CustomerDetailsContainer;
