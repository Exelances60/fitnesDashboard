"use client";

import Link from "next/link";
import heyImage from "@/../public/hey.png";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={inter.className}>
      <div className="flex flex-col items-center gap-14 w-full justify-center h-[800px]">
        <Image src={heyImage} alt="hey" width={200} height={200} />
        <h1 className="text-4xl font-bold text-gray-500">
          Something went wrong
        </h1>
        <p className="text-lg text-red-500">Error : {error.message}</p>

        <div className="w-52 h-14  border-2 border-black rounded-full flex justify-center items-center">
          <Link href="/dashboard" className="text-base uppercase text-black">
            Go Home
          </Link>
          <div className="absolute w-9 h-9 left-15 top-2">
            <div className="w-9 h-2 border-black transform rotate-45"></div>
            <div className="w-9 h-2 border-black transform -rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
