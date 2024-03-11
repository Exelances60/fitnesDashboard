import React from "react";
import { capitalizeFirstLetter } from "@/utils/utils";
import { Image } from "antd";

export const renderNameForEmployees = (text: string, record: IEmployee) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={`https://fitnesdashboard.onrender.com/${record.profilePicture}`}
        width={45}
        height={45}
        className="object-cover rounded-md"
        alt="profilePicture"
      />

      <div>
        <h1 className="font-bold">{capitalizeFirstLetter(text)}</h1>
        <p className="text-gray-400 text-sm">{record.email}</p>
      </div>
    </div>
  );
};
