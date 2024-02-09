"use client";
import React, { useMemo } from "react";
import { Layout } from "antd";
import { Menu } from "antd";
import { useAppSelector } from "@/store/store";
import { selectMenuKeys, selectUser } from "@/store/slices/userSlice";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import useSetUserFromToken from "@/hooks/useSetUserFromToken";
import { navMenu } from "@/mock/navMenu";
import useSetMenuKeys from "@/hooks/useSetMenuKeys";
import Loading from "@/app/loading";
import Link from "next/link";

const { Content, Header } = Layout;

const HeaderAntd = ({ children }: { children: React.ReactNode }) => {
  const { handleChangeMenuKeys } = useSetMenuKeys();
  const menuKeys = useAppSelector(selectMenuKeys);
  const userInfo = useAppSelector(selectUser);

  useSetUserFromToken();
  const menuItems = useMemo(() => {
    return navMenu.map((item) => (
      <Menu.Item key={item.key} icon={item.icon} onClick={handleChangeMenuKeys}>
        <Link href={`http://localhost:3000/${item.path}`} passHref>
          <div className="flex items-center gap-5">{item.name}</div>
        </Link>
      </Menu.Item>
    ));
  }, [handleChangeMenuKeys]);

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <Layout>
      <Layout.Sider
        breakpoint="lg"
        theme="light"
        collapsedWidth="0"
        className="shadow-lg z-50"
        onCollapse={(collapsed: any, type: any) => {}}
      >
        <div className="p-5 box-border">
          <div className="flex items-center justify-center h-20 bg-white">
            <div className="text-2xl font-bold">Logo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userInfo?.companyName}</div>
            <div className="text-sm">{userInfo?.email}</div>
          </div>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[menuKeys]}>
          {menuItems}
          <hr className="my-5" />
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            <div className="flex items-center gap-5">Settings</div>
          </Menu.Item>

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleChangeMenuKeys}
          >
            <div className="flex items-center gap-5">Logout</div>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Header style={{ backgroundColor: "#FFFF" }}>Header</Header>
        <Content
          style={{ margin: "0px 5px 0", backgroundColor: "#F5F6FA" }}
          className="shadow  rounded-md"
        >
          <div className="w-full p-4 box-border min-h-[92vh] overflow-y-auto mt-[10px] ">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HeaderAntd;