import React from "react";
import { Button, Input, Divider, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface SelectCategoryDropDownProps {
  menu: JSX.Element | string;
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  categoryList: string[];
  editable?: boolean;
}

const SelectCategoryDropDown = ({
  menu,
  setCategoryList,
  categoryList,
  editable,
}: SelectCategoryDropDownProps) => {
  const t = useTranslations("Product.ProductModal");
  const [categoryName, setCategoryName] = React.useState<string>("");

  const onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addItem = () => {
    if (categoryName.length < 1) {
      message.error(t("categoryNameError"));
      return;
    }
    setCategoryList([...categoryList, categoryName]);
    setCategoryName("");
  };

  return (
    <div>
      {menu}
      {editable ? (
        <>
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder={t("categoryName")}
              onKeyDown={(e) => e.stopPropagation()}
              value={categoryName}
              onChange={onCategoryChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              {t("addCategory")}
            </Button>
          </Space>
        </>
      ) : null}
    </div>
  );
};

export default SelectCategoryDropDown;
