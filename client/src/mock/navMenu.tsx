import * as Icons from "@ant-design/icons";

export const productsRole = ["owner", "trainer"];
export const inboxRole = ["owner"];
export const ordersRole = ["owner"];
export const employeesRole = ["owner", "finance", "admin", "management"];
export const customersRole = ["owner", "trainer"];
export const invoiceRole = ["owner", "trainer"];
export const eventsRole = ["owner", "trainer"];

export const navMenu = [
  {
    name: "Dashboard",
    icon: (
      <Icons.DashboardOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "/dashboard",
    key: "dashboard",
  },
  {
    name: "Products",
    icon: (
      <Icons.ProductOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/product",
    key: "products",
    role: productsRole,
  },
  {
    name: "Inbox",
    icon: (
      <Icons.InboxOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "/inbox",
    key: "inbox",
    role: inboxRole,
  },
  {
    name: "Orders List",
    icon: (
      <Icons.OrderedListOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/order",
    key: "orders",
    role: ordersRole,
  },
  {
    name: "Employees",
    icon: (
      <Icons.UsergroupAddOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/employees",
    key: "employees",
    role: employeesRole,
  },
  {
    name: "Customers",
    icon: (
      <Icons.UserOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/customer",
    key: "customers",
    role: customersRole,
  },
  {
    name: "Invoice",
    icon: (
      <Icons.FileTextOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/invoice",
    key: "invoice",
    role: invoiceRole,
  },
  {
    name: "Events",
    icon: (
      <Icons.CalendarOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
    path: "dashboard/events",
    key: "events",
    role: eventsRole,
  },
];
