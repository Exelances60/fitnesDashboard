import React, { Suspense, useEffect } from "react";
import { TreeSelect } from "antd";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectChartsType, setChartsType } from "@/store/slices/dashboardSlice";

interface DashboardChartsSelectProps {
  setChartsData: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const treeData = [
  {
    value: "product",
    title: "Product",
    selectable: false,
    children: [
      {
        value: "productAmount",
        title: "Product Amount",
      },
      {
        value: "productStock",
        title: "Product Stock",
      },
    ],
  },
  {
    value: "order",
    title: "Order",
    selectable: false,
    children: [
      {
        value: "orderAmount",
        title: "Order Amount",
      },
      {
        value: "orderCompleted",
        title: "Order Completed",
      },
      {
        value: "orderSales",
        title: "Order Sales",
      },
    ],
  },
  {
    value: "employee",
    title: "Employee",
    selectable: false,
    children: [
      {
        value: "employeeAmount",
        title: "Employee Amount",
      },
      {
        value: "employeeSalary",
        title: "Employee Salary",
      },
    ],
  },
  {
    value: "customer",
    title: "Customer",
    selectable: false,
    children: [
      {
        value: "customerAmount",
        title: "Customer Amount",
      },
      {
        value: "customerSales",
        title: "Customer Sales",
      },
    ],
  },
];

const DashboardChartsSelect = ({
  setChartsData,
  setLoading,
}: DashboardChartsSelectProps) => {
  const selectValue = useAppSelector(selectChartsType);
  const dispatch = useAppDispatch();
  const onChange = (newValue: string) => {
    dispatch(setChartsType(newValue));
  };
  const fetchChartsData = async (value: string) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/dashboard/charts/${value}`);
      setChartsData(
        response.data.chartsData.map((data: any) => {
          return {
            date: data.month,
            value: data.total,
          };
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectValue) {
      fetchChartsData(selectValue);
    }
  }, [selectValue]);

  return (
    <div className="flex justify-end pr-2">
      <TreeSelect
        className="lg:w-1/3 w-full"
        value={selectValue}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </div>
  );
};

export default DashboardChartsSelect;
