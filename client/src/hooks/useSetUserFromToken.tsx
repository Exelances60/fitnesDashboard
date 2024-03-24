import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCookie } from "cookies-next";
import { selectUser, setUser } from "@/store/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const useSetUserFromToken = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const token = getCookie("token");
    if (token && !user) {
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
    }
  }, [dispatch, user]);

  return null;
};

export default useSetUserFromToken;
