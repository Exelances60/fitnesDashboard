import React from "react";
import { Badge, Card, Grid } from "@tremor/react";

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
  const totalSalary = employees.reduce(
    (acc, employee) => acc + employee.salary,
    0
  );

  const currentMonthEmployeesSalary = (employees: IEmployee[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const currentSalary = employees
      .filter((employee) => {
        const employeeDate = new Date(employee.hireDate);
        return (
          employeeDate.getMonth() === currentMonth &&
          employeeDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, employee) => acc + employee.salary, 0);
    let previousSalary = employees
      .filter((employee) => {
        const employeeDate = new Date(employee.hireDate);
        return (
          employeeDate.getMonth() === previousMonth &&
          employeeDate.getFullYear() === previousYear
        );
      })
      .reduce((acc, employee) => acc + employee.salary, 0);
    previousSalary = previousSalary === 0 ? 1 : previousSalary;
    return ((currentSalary - previousSalary) / previousSalary) * 100;
  };

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
            {totalEmployeesCountIncarese.toFixed(2)}%
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
            color={`${
              currentMonthEmployeesSalary(employees) > 0 ? "red" : "green"
            }`}
            className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg"
          >
            {currentMonthEmployeesSalary(employees).toFixed(2)}%
          </Badge>
        </div>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(totalSalary || 0)}
        </p>
      </Card>
    </Grid>
  );
};

export default EmployeesStatsCard;
