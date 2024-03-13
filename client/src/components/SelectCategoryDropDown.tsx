import React from "react";
import { Button, Input, Divider, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosClient from "@/utils/AxiosClient";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";

interface SelectCategoryDropDownProps {
  menu: JSX.Element | string;
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  categoryList: string[];
}

const SelectCategoryDropDown = ({
  menu,
  setCategoryList,
  categoryList,
}: SelectCategoryDropDownProps) => {
  const userInfo = useSelectUserInfo();
  const [categoryName, setCategoryName] = React.useState<string>("");

  const onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (categoryName === undefined) return;
    message.loading({ content: "Adding Category", key: "category" });
    setCategoryList([...categoryList, categoryName]);
    setCategoryName("");

    try {
      const resposne = await axiosClient.post(
        "/products/add-product-category",
        {
          category: categoryName,
          ownerId: userInfo?._id,
        }
      );
      if (resposne.status === 201) {
        message.success({ content: "Category Added", key: "category" });
      }
    } catch (error) {
      message.error({ content: "Some error pls try again", key: "category" });
    }
  };
  return (
    <div>
      {menu}
      <Divider style={{ margin: "8px 0" }} />
      <Space style={{ padding: "0 8px 4px" }}>
        <Input
          placeholder="Please enter item"
          onKeyDown={(e) => e.stopPropagation()}
          value={categoryName}
          onChange={onCategoryChange}
        />
        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
          Add item
        </Button>
      </Space>
    </div>
  );
};

export default SelectCategoryDropDown;
