"use client";
import React from "react";
import { Layout } from "antd";

const { Sider, Content, Header, Footer } = Layout;

const HeaderAntd = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Sider className="bg-red-500">Sider</Sider>
      <Layout>
        <Header className="bg-blue-500">Header</Header>
        <Content className="bg-green-500">{children}</Content>
        <Footer className="bg-yellow-500">Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default HeaderAntd;
