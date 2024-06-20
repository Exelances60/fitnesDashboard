import React, { useEffect, useRef, useState } from "react";
import { selectUser } from "@/store/slices/userSlice";
import { useAppSelector } from "@/store/store";
import { Avatar } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ProfileCardOption from "./ProfileCardOption";

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const ProfileCardNavi = () => {
  const [open, setOpen] = useState(false);
  const userInfo = useAppSelector(selectUser);

  return (
    <>
      <div className="flex items-center justify-center bg-white z-10">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <Avatar
            size={32}
            onClick={() => setOpen((pv) => !pv)}
            src={userInfo?.ownerImage}
            className="shadow-lg cursor-pointer  ease-in duration-300"
          />
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            onMouseLeave={() => setOpen(false)}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[110%] -left-[100%] w-48 overflow-hidden"
          >
            <ProfileCardOption
              setOpen={setOpen}
              Icon={UserOutlined}
              text="Profile"
            />
            <ProfileCardOption
              setOpen={setOpen}
              Icon={LoginOutlined}
              text="Logout"
            />
          </motion.ul>
        </motion.div>
      </div>
    </>
  );
};

export default ProfileCardNavi;
