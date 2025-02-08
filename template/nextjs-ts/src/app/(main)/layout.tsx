"use client";

import { Button, Layout, Menu, theme } from "antd";
import { Children } from "@/type";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }: Children) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const siderItems = [
    {
      key: "1",
      icon: <FolderOutlined />,
      label: "Project",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "User",
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Setting",
    },
  ];
  const handleMenuClick = (item: ItemType<MenuItemType>) => {
    const target = siderItems[(item!.key as number) - 1];
    router.push(`/${target.label.toLowerCase()}`);
  };

  return (
    <Layout className="app-container">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider-container"
      >
        <div className="title">{collapsed ? <>后台</> : <>后台管理系统</>}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={siderItems}
          onClick={(item) => handleMenuClick(item)}
          className="menu-container"
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapsed-button"
          />
        </Header>
        <Content
          className="content-container"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
