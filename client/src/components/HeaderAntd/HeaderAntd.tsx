"use client";
import React, { useMemo } from "react";
import { Layout, message } from "antd";
import { Menu } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout, selectMenuKeys, selectUser } from "@/store/slices/userSlice";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { navMenu } from "@/mock/navMenu";
import useSetMenuKeys from "@/hooks/useSetMenuKeys";
import Loading from "@/app/loading";
import Link from "next/link";
import Image from "next/image";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import HeaderNavigation from "./HeaderNavigation";

const { Content, Header } = Layout;

const HeaderAntd = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleChangeMenuKeys } = useSetMenuKeys();
  const menuKeys = useAppSelector(selectMenuKeys);
  const userInfo = useAppSelector(selectUser);
  useGetUserInfo();

  const menuItems = useMemo(() => {
    return navMenu.map((item) => (
      <Menu.Item key={item.key} icon={item.icon} onClick={handleChangeMenuKeys}>
        <Link
          href={`https://fitnes-dashboard-azba.vercel.app/${item.path}`}
          passHref
        >
          <div className="flex items-center gap-5">{item.name}</div>
        </Link>
      </Menu.Item>
    ));
  }, [handleChangeMenuKeys]);

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie("token");
    message.success("Logout successfully");
    router.push("/");
  };

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
      >
        <div className="p-5 box-border flex flex-col items-center">
          <div className="flex items-center justify-center h-20 relative w-20  bg-white">
            <Image
              src={`${userInfo?.ownerImage}`}
              alt={userInfo?.companyName}
              fill
              priority={true}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
            />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userInfo?.companyName}</div>
          </div>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[menuKeys]}>
          {menuItems}
          <hr className="my-5" />
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            <div className="flex items-center gap-5">
              <Link href="https://fitnes-dashboard-azba.vercel.app/dashboard/settings">
                Settings
              </Link>
            </div>
          </Menu.Item>

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            <div className="flex items-center gap-5">Logout</div>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#FFFF",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <HeaderNavigation />
        </Header>
        <Content
          style={{ margin: "0px 5px 0", backgroundColor: "#F5F6FA" }}
          className="shadow  rounded-md"
        >
          <div className="w-full p-4 box-border min-h-[92vh] overflow-y-auto mt-[10px] max-h-[92vh]">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HeaderAntd;
