import { useMemo } from "react";
import * as Icons from "@ant-design/icons";
import { useTranslations } from "next-intl";

export const roles = {
  products: ["owner", "trainer"],
  inbox: ["owner", "trainer"],
  orders: ["owner"],
  employees: ["owner", "finance", "admin", "management"],
  customers: ["owner", "trainer"],
  invoice: ["owner", "trainer"],
  events: ["owner", "trainer"],
};

const useNavMenu = () => {
  const t = useTranslations("NavMenu");
  const navMenu = useMemo(
    () => [
      {
        name: t("dashboard"),
        icon: <Icons.DashboardOutlined style={{ fontSize: "20px" }} />,
        path: "/dashboard",
        key: "dashboard",
      },
      {
        name: t("products"),
        icon: <Icons.ProductOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/product",
        key: "products",
        role: roles.products,
      },
      {
        name: t("inbox"),
        icon: <Icons.InboxOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/inbox",
        key: "inbox",
        role: roles.inbox,
      },
      {
        name: t("orders"),
        icon: <Icons.OrderedListOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/order",
        key: "orders",
        role: roles.orders,
      },
      {
        name: t("employees"),
        icon: <Icons.UsergroupAddOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/employees",
        key: "employees",
        role: roles.employees,
      },
      {
        name: t("customers"),
        icon: <Icons.UserOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/customer",
        key: "customers",
        role: roles.customers,
      },
      {
        name: t("invoices"),
        icon: <Icons.FileTextOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/invoice",
        key: "invoice",
        role: roles.invoice,
      },
      {
        name: t("events"),
        icon: <Icons.CalendarOutlined style={{ fontSize: "20px" }} />,
        path: "dashboard/events",
        key: "events",
        role: roles.events,
      },
    ],
    [t]
  );

  return navMenu;
};

export default useNavMenu;
