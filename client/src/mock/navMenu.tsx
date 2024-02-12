import * as Icons from "@ant-design/icons";
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
    path: "/employees",
    key: "employees",
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
    path: "/invoice",
    key: "invoice",
  },
];
