import { logout, selectUser } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Avatar, Dropdown, message } from "antd";
import { MenuProps } from "antd/lib";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const ProfileCardNavi = () => {
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie("token");
    message.success("Logout successfully");
    router.push("/");
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "Profile":
        router.push("/dashboard/settings");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "Profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "Logout",
      label: "Logout",
      icon: <LoginOutlined />,
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items, onClick }}
        placement="bottomRight"
        trigger={["click"]}
        arrow={{ pointAtCenter: true }}
        overlayClassName="bg-white shadow-lg rounded-md"
        dropdownRender={(menu) => (
          <div>
            <div className="p-2 text-center text-gray-500 text-sm">
              {userInfo?.companyName}
            </div>
            {menu}
          </div>
        )}
      >
        <Avatar
          size={32}
          src={userInfo?.ownerImage}
          className="shadow-lg cursor-pointer hover:scale-105 ease-in duration-300"
        />
      </Dropdown>
    </>
  );
};

export default ProfileCardNavi;
