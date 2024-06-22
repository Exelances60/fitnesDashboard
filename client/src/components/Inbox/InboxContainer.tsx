import React from "react";
import InboxUsersList from "./InboxUsersList";
import { fetchEmplooyes } from "@/actions/fetchEmployees";
import InboxChat from "./InboxChat";

const InboxContainer = async () => {
  const { employees } = await fetchEmplooyes();
  return (
    <>
      <InboxUsersList employees={employees} />
      <InboxChat />
    </>
  );
};

export default InboxContainer;
