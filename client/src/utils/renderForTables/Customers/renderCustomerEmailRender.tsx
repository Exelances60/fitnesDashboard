import React from "react";
import { Tooltip, Button } from "antd";

export const renderCustomerEmailRender = (text: string) => {
  return (
    <p className="text-blue-500 underline overflow-hidden">
      <Tooltip
        placement="bottomLeft"
        title={() => {
          return (
            <div className="flex flex-col items-center">
              <p>{text}</p>
              Send Email
              <Button
                type="primary"
                href={`mailto:${text}`}
                className="mt-2"
                ghost
              >
                {text}
              </Button>
            </div>
          );
        }}
      >
        {text}
      </Tooltip>
    </p>
  );
};
