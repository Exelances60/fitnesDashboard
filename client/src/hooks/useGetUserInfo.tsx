import { useEffect } from "react";
import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import useSelectUserInfo from "./useSelectUserInfo";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const useGetUserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userInfoRedux = useSelectUserInfo();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfoRedux) {
        return;
      } else {
        const response = await fetchOwnerInfo();

        if (response?.errorMessage) {
          message.error({ content: response.errorMessage, duration: 2 });
          deleteCookie("token");
          return router.push("/");
        }
        dispatch(setUser(response?.owner));
      }
    };
    fetchUserInfo();
  }, [userInfoRedux, dispatch, router]);
};

export default useGetUserInfo;
