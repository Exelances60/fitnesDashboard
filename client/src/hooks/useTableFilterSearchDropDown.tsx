import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const useTableFilterSearchDropDown = () => {
  const [searchById, setSearchById] = useState("");

  const filterDropdown = () => (
    <div className="p-5">
      <Input
        placeholder="Search Order Id"
        value={searchById}
        onChange={(e) => setSearchById(e.target.value)}
        prefix={<SearchOutlined />}
      />
    </div>
  );

  const filterIcon = (filtered: any) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  );

  return { filterDropdown, filterIcon, searchById };
};

export default useTableFilterSearchDropDown;
