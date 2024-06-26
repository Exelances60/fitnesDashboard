"use client";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { Button, Image } from "antd";
import React from "react";

interface EmployeesDetailsModalProps {
  employee: IEmployee;
}

const EmployeesDetailsModal = ({ employee }: EmployeesDetailsModalProps) => {
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <div className="w-96 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Image
          src={`${employee.profilePicture}`}
          width={100}
          height={100}
          className="object-cover rounded-md"
          alt="profilePicture"
        />
        <div>
          <h1 className="text-xl font-bold">{employee.name}</h1>
          <p className="text-gray-500">{employee.email}</p>
          <p>+90{employee.phone}</p>
        </div>
      </div>
      <p>Adrees : {employee.address}</p>
      <p>Positon : {employee.position}</p>
      <p>Age : {employee.age}</p>
      <p>Salary : {renderCurrency(employee.salary)}</p>
      <p>Education Status : {employee.education}</p>
      <p>Universty : {employee.university}</p>
      <p>Hire Date : {new Date(employee.hireDate || "").toLocaleString()}</p>
      <h1 className="text-xl font-bold">Documents</h1>
      <div className="w-full flex gap-2 items-center justify-center">
        {employee && employee.documents
          ? employee.documents.map((doc, index) => (
              <Image
                key={index}
                src={`${doc}`}
                width={90}
                height={90}
                alt="document"
                className="border-2 border-gray-200 rounded-md "
              />
            ))
          : null}
        <Button type="primary" ghost>
          Request Documents
        </Button>
      </div>
    </div>
  );
};

export default EmployeesDetailsModal;
