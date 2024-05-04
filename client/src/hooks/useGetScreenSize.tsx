import React from "react";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

export const useGetScreenSize = () => {
  const screens = useBreakpoint();
  return screens;
};
