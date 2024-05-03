import React from "react";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const useGetScreenSize = () => {
  const screens = useBreakpoint();
  return screens;
};

export default useGetScreenSize;
