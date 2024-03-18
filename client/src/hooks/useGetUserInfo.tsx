import { useEffect } from "react";
import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import useSelectUserInfo from "./useSelectUserInfo";

const useGetUserInfo = () => {
  const dispatch = useAppDispatch();
  const userInfoRedux = useSelectUserInfo();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfoRedux) {
        return;
      } else {
        const response = await fetchOwnerInfo();

        dispatch(setUser(response?.owner));
      }
    };
    fetchUserInfo();
  }, [userInfoRedux, dispatch]);
};

export default useGetUserInfo;
