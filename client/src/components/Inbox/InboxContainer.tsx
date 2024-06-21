import React from "react";
import InboxUsersList from "./InboxUsersList";
import { fetchEmplooyes } from "@/actions/fetchEmployees";

const InboxContainer = async () => {
  const { employees } = await fetchEmplooyes();
  return (
    <>
      <InboxUsersList employees={employees} />
      <div className="bg-blue-500 w-[80%] h-full"></div>
    </>
  );
};

export default InboxContainer;
