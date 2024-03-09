import React from "react";
import { Badge, Card, Grid } from "@tremor/react";

interface EmployeesStatsCardProps {
  totalEmployees: number;
}

const EmployeesStatsCard = ({ totalEmployees }: EmployeesStatsCardProps) => {
  return (
    <Grid numItems={1} numItemsSm={1} numItemsLg={3} className="gap-2 ">
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Total Employees
          </p>
          <Badge
            size="lg"
            color={`${"green"}`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            50%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {totalEmployees} Per
        </p>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Total Employees Salary
          </p>
          <Badge
            size="lg"
            color={`${"green"}`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            50%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(totalEmployees * 2000)}
        </p>
      </Card>
      <Card> </Card>
    </Grid>
  );
};

export default EmployeesStatsCard;
