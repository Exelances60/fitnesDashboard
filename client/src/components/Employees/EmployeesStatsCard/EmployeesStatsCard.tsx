import React from "react";
import { Badge, Card, Grid } from "@tremor/react";
import EmployeesSalaryCard from "./EmployeesSalaryCard";

interface EmployeesStatsCardProps {
  totalEmployees: number;
  employees: IEmployee[];
  totalEmployeesCountIncarese: number;
}

const EmployeesStatsCard = ({
  totalEmployees,
  employees,
  totalEmployeesCountIncarese,
}: EmployeesStatsCardProps) => {
  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-2">
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Total Employees
          </p>
          <Badge
            size="lg"
            color={totalEmployeesCountIncarese > 0 ? "green" : "red"}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            {totalEmployeesCountIncarese
              ? totalEmployeesCountIncarese.toFixed(2)
              : 0}
            %
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {totalEmployees} Per
        </p>
      </Card>
      <EmployeesSalaryCard employees={employees} />
    </Grid>
  );
};

export default EmployeesStatsCard;
