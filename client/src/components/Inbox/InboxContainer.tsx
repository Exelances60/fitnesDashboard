import React from "react";
import InboxUsersList from "./InboxUsersList";
import { fetchEmplooyes } from "@/actions/fetchEmployees";
import InboxChat from "./InboxChat";
import { fetchInbox } from "@/actions/fetchInbox";
import ErrorPage from "../ErrorPage";

const InboxContainer = async () => {
  const [inboxData, empData] = await Promise.all([
    fetchInbox(),
    fetchEmplooyes(),
  ]);
  const { employees } = empData;
  if (inboxData?.error) {
    return (
      <ErrorPage
        error={"Error fetching inbox data"}
        status="500"
        title="Error"
      />
    );
  }

  return (
    <div className="w-full h-full flex lg:flex-row flex-col">
      <InboxUsersList employees={employees} chat={inboxData?.data} />
      <InboxChat />
    </div>
  );
};

export default InboxContainer;
