"use client";
import React from "react";
import { Layout } from "antd";
import { Menu } from "antd";
import { useAppSelector } from "@/store/store";
import { selectMenuKeys, selectUser } from "@/store/slices/userSlice";
import { navMenu } from "@/mock/navMenu";
import useSetMenuKeys from "@/hooks/useSetMenuKeys";
import Loading from "@/app/loading";
import Link from "next/link";
import Image from "next/image";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import HeaderNavigation from "./HeaderNavigation";

const { Content, Header } = Layout;

const HeaderAntd = ({ children }: { children: React.ReactNode }) => {
  const { handleChangeMenuKeys } = useSetMenuKeys();
  const menuKeys = useAppSelector(selectMenuKeys);
  const userInfo = useAppSelector(selectUser);
  useGetUserInfo();

  const menuItems = navMenu.map((item) => {
    return {
      key: item.key,
      onClick: handleChangeMenuKeys,
      icon: item.icon,
      label: (
        <Link href={`http://localhost:3000/${item.path}`} passHref>
          <div className="flex items-center gap-5">{item.name}</div>
        </Link>
      ),
    };
  });

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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[menuKeys]}
          items={menuItems}
        />
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
