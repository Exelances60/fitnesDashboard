import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slices/userSlice";
import { message } from "antd";
import { motion } from "framer-motion";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

const actionIconVariants = {
  open: {
    scale: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  closed: {
    scale: 0,
    y: -7,
    transition: { duration: 0.2 },
  },
};

const ProfileCardOption = ({
  text,
  Icon,
  setOpen,
}: {
  text: string;
  Icon: React.ElementType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event?: (text: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie("token");
    message.success("Logout successfully");
    router.push("/");
  };

  const onClick = (text: string) => {
    switch (text) {
      case "Profile":
        router.push("/dashboard/settings");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        onClick(text);
        setOpen(false);
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default ProfileCardOption;
