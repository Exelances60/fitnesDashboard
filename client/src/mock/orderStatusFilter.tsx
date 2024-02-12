import { Badge } from "@tremor/react";

export const statusFilter = [
  {
    text: "Pending",
    value: "Pending" || "pending",
  },
  {
    text: "Completed",
    value: "Completed" || "completed",
  },
  {
    text: "Cancelled",
    value: "Cancelled" || "cancelled",
  },
  {
    text: "Preparing",
    value: "Preparing" || "preparing",
  },
];

export const statusRender = (text: string) => {
  if (text === "Pending" || text === "pending") {
    return <Badge color="violet">{text}</Badge>;
  }
  if (text === "Completed" || text === "completed") {
    return <Badge color="emerald">{text}</Badge>;
  }
  if (text === "Cancelled" || text === "cancelled") {
    return <Badge color="red">{text}</Badge>;
  }
  if (text === "Preparing" || text === "preparing") {
    return <Badge color="blue">{text}</Badge>;
  }
};
