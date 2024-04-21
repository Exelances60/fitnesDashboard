"use client";
import React from "react";
import { Badge, Card } from "@tremor/react";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface EmployeesSalaryCardProps {
  employees: IEmployee[];
}
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

const EmployeesSalaryCard = ({ employees }: EmployeesSalaryCardProps) => {
  const { renderCurrency } = useCurrencyFormatter();
  const totalSalary = employees.reduce(
    (acc, employee) => acc + employee.salary,
    0
  );

  return (
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
        {renderCurrency(totalSalary || 0)}
      </p>
    </Card>
  );
};

export default EmployeesSalaryCard;
