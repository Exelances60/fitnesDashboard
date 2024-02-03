import SvgComp from "@/components/SvgComp";
import React from "react";
import NotFoundImage from "@/../public/404.svg";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#4880FF] overflow-hidden">
      <div className="w-[350px]  md:w-[630px] md:h-[700px] h-[600px] bg-white rounded-[20px] flex flex-col gap-[15px] items-center justify-center z-20">
        <Image
          src={NotFoundImage}
          alt="404"
          width={300}
          height={300}
          property="100"
        />
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-[#6E7191]">
          The page you are looking for does not exist
        </p>
        <Link
          href="/dashboard"
          className="p-5 text-white box-border bg-[#5a89f8] rounded"
        >
          Go back to dashboard
        </Link>
      </div>
      <SvgComp />
    </div>
  );
};

export default NotFound;
