import { setMenuKeys } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";

const useSetMenuKeys = () => {
  const dispatch = useAppDispatch();
  const handleChangeMenuKeys = (menuKeys: {
    key: string;
    keyPath: string[];
  }) => {
    dispatch(setMenuKeys(menuKeys.key));
  };

  return { handleChangeMenuKeys };
};

export default useSetMenuKeys;
