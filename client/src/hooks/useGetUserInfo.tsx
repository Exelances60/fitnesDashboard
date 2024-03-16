import { useEffect, useState } from "react";
import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserInfo, setUserInfoRedux } from "@/store/slices/userSlice";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<OwnerType>();
  const dispatch = useAppDispatch();
  const userInfoRedux = useAppSelector(selectUserInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfoRedux) {
        return setUserInfo(userInfoRedux);
      } else {
        const response = await fetchOwnerInfo();
        setUserInfo(response?.owner);
        dispatch(setUserInfoRedux(response?.owner));
      }
    };
    fetchUserInfo();
  }, [userInfoRedux, dispatch]);
  return userInfo;
};

export default useGetUserInfo;
