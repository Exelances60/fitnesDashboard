"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const fetchInbox = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return { error: "Token not found", data: [] };
  }
  const decode = jwtDecode(token) as jwtUserDecode;
  const bodyValue = decode.role === "owner" ? decode.ownerId : decode._id;
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/inbox/get-inbox/${bodyValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (response.ok) {
      return { error: null, data: data.inbox };
    }
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
};
