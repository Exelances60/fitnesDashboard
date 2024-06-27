import React from "react";
import RegisterSteps from "@/components/Register/RegisterSteps";
import Link from "next/link";
import LoginRightSide from "@/components/LoginRightSide";
import { useTranslations } from "next-intl";
import LocaleComponent from "@/components/LocaleComponent";

const RegisterPage = () => {
  const t = useTranslations("AuthPages");
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen bg-gray-100">
      <div className="absolute top-8 left-0 p-3 ">
        <LocaleComponent />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="grid w-[500px] gap-6 p-5 lg:p-5 xl:p-0">
          <div className="grid gap-2  z-10">
            <h1 className="text-3xl font-bold">{t("register")}</h1>
            <p className="text-balance text-muted-foreground">
              {t("registerDescription")}
            </p>
            <Link href="/" className="text-blue-500 hover:underline">
              {t("allHaveAccount")}
            </Link>
          </div>
          <div className="grid gap-4 z-10">
            <RegisterSteps />
          </div>
        </div>
      </div>
      <LoginRightSide register={true} />
    </div>
  );
};

export default RegisterPage;
