import { Grid } from "@tremor/react";
import React from "react";
import OrderChartsTotalPrice from "./OrderChartsTotalPrice";
import OrderChartsCategory from "./OrderChartsCategory";
import { orderDonutChartType } from "@/types/Order";

type OrderChatsProps = {
  chartsDonutData: orderDonutChartType[];
};

const OrderChats = ({ chartsDonutData }: OrderChatsProps) => {
  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-2">
      <OrderChartsTotalPrice chartsDonutData={chartsDonutData} />
      <OrderChartsCategory chartsDonutData={chartsDonutData} />
    </Grid>
  );
};

export default OrderChats;
