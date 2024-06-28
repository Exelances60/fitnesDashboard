import React from "react";
import Image from "next/image";
import Link from "next/link";

const NoPermission = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[88vh] bg-gray-100">
      <div className="max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            No Permission
          </h1>
          <p className="text-gray-600">
            You don&apos;t have permission to access this page.
          </p>
          {/*       <Link href="/dashboard">
            <p className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Go Back
            </p>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NoPermission;
