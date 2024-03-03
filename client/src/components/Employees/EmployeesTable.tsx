import React from "react";
import { Table } from "antd";
import { renderNameForEmployees } from "@/utils/renderForTables/Employees/renderForName";
import EmployeesDetailsModal from "./EmployeesDetailsModal/EmployeesDetailsModal";
import useTableFilterSearchDropDown from "@/hooks/useTableFilterSearchDropDown";
import { renderForActionTable } from "@/utils/renderForTables/renderForActionTable";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import { showModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/store";
import EmployeesEditModal from "./EmployeesEditModal/EmployeesEditModal";
import DrawerFooterButton from "../DrawerFooterButton";

interface EmployeesTableProps {
  employeeData: IEmployee[];
}

const EmployeesTable = ({ employeeData }: EmployeesTableProps) => {
  let positionFilter: { text: string; value: string }[] = [];
  const dispatch = useAppDispatch();
  const { filterDropdown, filterIcon, searchById } =
    useTableFilterSearchDropDown("Search by name");

  const openDetailsDrawer = (record: IEmployee) => {
    dispatch(
      showModal({
        children: <EmployeesDetailsModal employee={record} />,
        title: "Employee Details",
      })
    );
  };

  const openEditDrawer = (record: IEmployee) => {
    dispatch(
      setShowDrawer({
        children: <EmployeesEditModal employee={record} />,
        title: "Edit Employee",
        footer: <DrawerFooterButton formName="editEmployeeForm" />,
      })
    );
  };

  const filterBySearchEmployees = employeeData.filter((employee) => {
    return employee.name.toLowerCase().includes(searchById.toLowerCase());
  });

  employeeData.forEach((employee) => {
    if (
      !positionFilter.some((position) => position.value === employee.position)
    ) {
      positionFilter.push({
        text: employee.position || "No Position",
        value: employee.position || "No Position",
      });
    }
  });
  return (
    <Table
      dataSource={filterBySearchEmployees}
      rowKey="_id"
      pagination={{ pageSize: 10 }}
      className="overflow-auto"
    >
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        width={400}
        render={renderNameForEmployees}
        filterDropdown={filterDropdown}
        filterIcon={filterIcon}
      />
      <Table.Column
        title="Position"
        dataIndex="position"
        key="position"
        filters={positionFilter}
        onFilter={(value, record: IEmployee[] | any) =>
          record.position.indexOf(value) === 0
        }
      />
      <Table.Column
        title="Phone"
        dataIndex="phone"
        key="phone"
        render={(phone) => {
          return <p className="text-blue-500 cursor-pointer">{phone}</p>;
        }}
      />
      <Table.Column
        title="Email"
        dataIndex="email"
        key="email"
        render={(email) => {
          return <p className="text-blue-500 cursor-pointer">{email}</p>;
        }}
      />
      <Table.Column
        title="Age"
        dataIndex="age"
        key="age"
        render={(age) => {
          return <p className=" cursor-pointer">{age}</p>;
        }}
      />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        key="actions"
        width={100}
        render={(text, record: IEmployee) => {
          return renderForActionTable(
            text,
            record,
            openDetailsDrawer,
            openEditDrawer,
            () => {}
          );
        }}
      />
    </Table>
  );
};

export default EmployeesTable;
