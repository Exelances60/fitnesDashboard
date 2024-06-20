"use client";

import Link from "next/link";
import heyImage from "@/../public/hey.png";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const inter = Montserrat({ subsets: ["latin"] });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0, y: 100 }}
      className={inter.className}
    >
      <div className="flex flex-col items-center gap-14 w-full justify-center h-[800px]">
        <Image src={heyImage} alt="hey" width={200} height={200} />
        <h1 className="text-4xl font-bold text-gray-500">
          Something went wrong
        </h1>
        <p className="text-lg text-red-500">Error : {error.message}</p>

        <Link href="/dashboard" className="text-base uppercase text-black">
          <button
            className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            onClick={reset}
          >
            Go back to dashboard
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
