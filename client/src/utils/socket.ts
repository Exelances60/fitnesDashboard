import { io } from "socket.io-client";

const URL = process.env.BACK_END_SERVICES as string;

export const socket = io(URL);
