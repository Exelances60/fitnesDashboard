"use server";

import { cookies } from "next/headers";

export const setLocale = async (locale: string) => {
  cookies().set("locale", locale);
};
