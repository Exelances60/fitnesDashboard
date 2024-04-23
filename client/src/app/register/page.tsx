import React from "react";
import Image from "next/image";
import PLACEHOLDERIMAGE from "@/../public/dashboard/placeholder.svg";
import RegisterSteps from "@/components/Register/RegisterSteps";

const RegisterPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen bg-gray-100">
      <div className="flex items-center justify-center py-12">
        <div className="grid w-[500px] gap-6 p-5 lg:p-5 xl:p-0">
          <div className="grid gap-2 text-center z-10">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Create an account to access all features
            </p>
          </div>
          <div className="grid gap-4 z-10">
            <RegisterSteps />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative bg-blue-400">
        <Image
          src={PLACEHOLDERIMAGE}
          alt="placeholder"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
