import React from "react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

const useGetTokenPayload = () => {
  if (!getCookie("token")) return undefined;
  const payload = jwtDecode(getCookie("token") as string) as jwtUserDecode;
  return payload;
};

export default useGetTokenPayload;
