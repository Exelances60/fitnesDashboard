import type { SelectProps } from "antd";
import { Tag } from "antd";

type TagRender = SelectProps["tagRender"];

export const tagRender: TagRender = (props) => {
  const { value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"gray"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {value}
    </Tag>
  );
};
