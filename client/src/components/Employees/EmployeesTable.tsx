import React from "react";
import { Table, message } from "antd";
import { renderNameForEmployees } from "@/utils/renderForTables/Employees/renderForName";
import EmployeesDetailsModal from "./EmployeesDetailsModal/EmployeesDetailsModal";
import useTableFilterSearchDropDown from "@/hooks/useTableFilterSearchDropDown";
import { renderForActionTable } from "@/utils/renderForTables/renderForActionTable";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import { showModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/store";
import EmployeesEditModal from "./EmployeesEditModal/EmployeesEditModal";
import DrawerFooterButton from "../DrawerFooterButton";
import axiosClient from "@/utils/AxiosClient";

interface EmployeesTableProps {
  employeeData: IEmployee[];
  setEmployeeData: React.Dispatch<React.SetStateAction<IEmployee[]>>;
}

const EmployeesTable = ({
  employeeData,
  setEmployeeData,
}: EmployeesTableProps) => {
  const positionFilter = employeeData
    .map((employee) => employee.position || "No Position")
    .filter(
      (position, index, self) => !!position && self.indexOf(position) === index
    )
    .map((position) => ({ text: position, value: position }));

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
        children: (
          <EmployeesEditModal
            employee={record}
            setEmployeeData={setEmployeeData}
          />
        ),
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
      !positionFilter.some(
        (position) =>
          position.value.toLowerCase().trim() ===
          employee.position?.toLowerCase().trim()
      )
    ) {
      positionFilter.push({
        text: employee.position || "No Position",
        value: employee.position || "No Position",
      });
    }
  });

  const deleteEmployee = async (record: IEmployee) => {
    message.loading({ content: "Deleting employee...", key: "deleteEmployee" });
    try {
      const response = await axiosClient.delete(
        `/employees/delete-employee/${record._id}`
      );
      if (response.status === 200) {
        message.success({
          content: "Employee deleted successfully",
          key: "deleteEmployee",
        });
        setEmployeeData((prev) =>
          prev.filter((employee) => employee._id !== record._id)
        );
      }
    } catch (error: any) {
      message.error({
        content: error.response.data.message || "Error deleting employee",
        key: "deleteEmployee",
      });
    }
  };

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
            deleteEmployee
          );
        }}
      />
    </Table>
  );
};

export default EmployeesTable;
