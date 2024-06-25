import React, { useEffect, useState } from "react";
import { selectUser } from "@/store/slices/userSlice";
import { useAppSelector } from "@/store/store";
import { Avatar, message } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ProfileCardOption from "./ProfileCardOption";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import { socket } from "@/utils/socket";
import useSound from "use-sound";

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
  const [play] = useSound("/sounds/message.mp3", { volume: 0.5 });
  const [open, setOpen] = useState(false);
  const userInfo = useAppSelector(selectUser);
  const tokenPayload = useGetTokenPayload();
  useEffect(() => {
    if (tokenPayload?._id) {
      socket.on("notification", (data) => {
        if (data.receiverId === tokenPayload?._id) {
          play();
          message.info({
            content: "You have a new notification",
            duration: 2,
          });
        }
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [tokenPayload]);

  return (
    <>
      <div className="flex items-center justify-center bg-white z-10">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <Avatar
            size={32}
            onClick={() => setOpen((pv) => !pv)}
            src={
              tokenPayload?.image ? tokenPayload?.image : userInfo?.ownerImage
            }
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
