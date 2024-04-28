import { fetchRegisterAccount } from "@/actions/fetchPendigRegisterAccounts";
import RegistrationApplicationStatus from "@/components/RegistrationApplication/RegistrationApplication";
import React from "react";

interface RegisterStatusProps {
  params: {
    registerid: string;
  };
}

const RegisterStatus = async ({ params }: RegisterStatusProps) => {
  const data = await fetchRegisterAccount(params.registerid);
  if (data.errorMessage && !data.peddingRegister) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-2xl text-red-500">{data.errorMessage}</div>
      </div>
    );
  }

  return <RegistrationApplicationStatus data={data.peddingRegister} />;
};

export default RegisterStatus;
