import React, { Suspense } from "react";
import { Card, Grid, Metric } from "@tremor/react";
import Image from "next/image";
import userIcon from "@/../public/dashboard/user.svg";
import orderIcon from "@/../public/dashboard/order.svg";
import salesIcon from "@/../public/dashboard/sales.svg";
import employeeIcon from "@/../public/dashboard/employees.svg";
import fetchDashboard from "@/actions/fetchDashboard";

const DashboardCard = async () => {
  const { data } = await fetchDashboard();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-2">
        <Card>
          <div className="w-full flex justify-between">
            <p className="text-lg font-semibold text-[#606060]">
              Total Products
            </p>
            <div>
              <Image src={userIcon} width={50} height={50} alt="total user" />
            </div>
          </div>
          <Metric>
            {data?.products ? data.products : "No data available"}
          </Metric>
        </Card>
        <Card>
          <div className="w-full flex justify-between">
            <p className="text-lg font-semibold text-[#606060]">Total Orders</p>
            <div>
              <Image
                src={orderIcon}
                width={50}
                height={50}
                alt="total order"
                className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
              />
            </div>
          </div>
          <Metric>
            {data?.totalOrders ? data.totalOrders : "No data available"}
          </Metric>
        </Card>
        <Card>
          <div className="w-full flex justify-between">
            <p className="text-lg font-semibold text-[#606060]">Total Sales</p>
            <div>
              <Image
                src={salesIcon}
                width={50}
                height={50}
                alt="total sales"
                className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
              />
            </div>
          </div>
          <Metric>
            {data?.totalCompletedOrders
              ? data.totalCompletedOrders
              : "No data available"}
          </Metric>
        </Card>
        <Card>
          <div className="w-full flex justify-between">
            <p className="text-lg font-semibold text-[#606060]">
              Total Employees
            </p>
            <div>
              <Image
                src={employeeIcon}
                width={50}
                height={50}
                alt="total employee"
                className="cursor-pointer hover:-translate-y-2 ease-in-out duration-300 transform"
              />
            </div>
          </div>
          <Metric>
            {data?.employees ? data.employees : "No data available"}
          </Metric>
        </Card>
      </Grid>
    </Suspense>
  );
};

export default DashboardCard;
