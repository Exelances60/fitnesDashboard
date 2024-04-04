import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ ...props }) => {
  return <ReactQuill {...props} theme="snow" />;
};

export default TextEditor;
