import React from "react";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slices/userSlice";

const useSelectUserInfo = () => {
  const userInfo = useAppSelector(selectUser);
  return userInfo;
};

export default useSelectUserInfo;
