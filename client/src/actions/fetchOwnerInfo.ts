"use server";
import { cookies } from "next/headers";
interface IPromiseOwnerInfo {
  owner?: OwnerType;
  errorMessage?: string;
}

export const fetchOwnerInfo = async (): Promise<IPromiseOwnerInfo> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      errorMessage: "No token found",
    };
  }
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/auth/ownerInfo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      errorMessage: error.message,
    };
  }
};
