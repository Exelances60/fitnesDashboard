import React from "react";
import { Button, Popconfirm } from "antd";
import {
  FolderOutlined,
  HighlightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const renderForActionTable = (
  text: string,
  record: any,
  handleOnDetails: (record: any) => void,
  handleEditOnClick: (record: any) => void,
  handleDeleteCustomerOnClick: (record: any) => void
) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        type="primary"
        ghost
        icon={<FolderOutlined />}
        onClick={() => handleOnDetails(record)}
      >
        Details
      </Button>
      <Button
        type="primary"
        ghost
        icon={<HighlightOutlined />}
        onClick={() => handleEditOnClick(record)}
      >
        Edit
      </Button>
      <Popconfirm
        title="Are you sure to delete this customer?"
        onConfirm={() => handleDeleteCustomerOnClick(record)}
      >
        <Button type="primary" danger ghost icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};
