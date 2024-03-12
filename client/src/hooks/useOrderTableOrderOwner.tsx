import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const useTableSearchOrderOwner = (placeHolder: string) => {
  const [searchByOrderOwner, setsearchByOrderOwner] = useState("");

  const filterDropdownOrderOwner = () => (
    <div className="p-5">
      <Input
        placeholder={placeHolder}
        value={searchByOrderOwner}
        onChange={(e) => setsearchByOrderOwner(e.target.value)}
        prefix={<SearchOutlined />}
      />
    </div>
  );

  return { filterDropdownOrderOwner, searchByOrderOwner };
};

export default useTableSearchOrderOwner;
