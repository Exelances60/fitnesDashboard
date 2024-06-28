import React, { Suspense, useEffect } from "react";
import { TreeSelect } from "antd";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectChartsType, setChartsType } from "@/store/slices/dashboardSlice";
import { useTranslations } from "next-intl";

interface DashboardChartsSelectProps {
  setChartsData: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardChartsSelect = ({
  setChartsData,
  setLoading,
}: DashboardChartsSelectProps) => {
  const t = useTranslations("Dashboard.DashboardChartsContent");
  const treeData = [
    {
      value: "product",
      title: t("product"),
      selectable: false,
      children: [
        {
          value: "productAmount",
          title: t("productAmount"),
        },
        {
          value: "productStock",
          title: t("productStock"),
        },
      ],
    },
    {
      value: "order",
      title: t("order"),
      selectable: false,
      children: [
        {
          value: "orderAmount",
          title: t("orderAmount"),
        },
        {
          value: "orderCompleted",
          title: t("orderCompleted"),
        },
        {
          value: "orderSales",
          title: t("orderSales"),
        },
      ],
    },
    {
      value: "employee",
      title: t("employees"),
      selectable: false,
      children: [
        {
          value: "employeeAmount",
          title: t("employeesAmount"),
        },
        {
          value: "employeeSalary",
          title: t("employeesSalary"),
        },
      ],
    },
    {
      value: "customer",
      title: t("customer"),
      selectable: false,
      children: [
        {
          value: "customerAmount",
          title: t("customerAmount"),
        },
        {
          value: "customerSales",
          title: t("customerSales"),
        },
      ],
    },
  ];

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
        placeholder={t("pleaseSelect")}
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </div>
  );
};

export default DashboardChartsSelect;
