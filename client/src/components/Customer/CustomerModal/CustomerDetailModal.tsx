import { CustomerType } from "@/models/dataTypes";
import { capitalizeFirstLetter } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CustomerEditModalProps {
  customer: CustomerType;
}

const CustomerDetailsModal = ({ customer }: CustomerEditModalProps) => {
  return (
    <div className="flex flex-col  gap-5">
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <Image
          src={`http://localhost:8080/${customer.profilePicture}`}
          width={200}
          height={200}
          className="object-cover rounded-md"
          alt="profilePicture"
        />
        <p className="text-[#202224] font-bold text-lg">{customer.name}</p>
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="flex gap-2">
          Email:
          <p className="font-bold">{customer.email}</p>
        </p>
        <p className="flex gap-2">
          Phone: <p className="font-bold">+90{customer.phone}</p>
        </p>
        <p className="flex gap-2">
          Age: <p className="font-bold">{customer.age}</p>
        </p>
        <p className="flex gap-2">
          BodyWeight: <p className="font-bold">{customer.bodyWeight}</p>
        </p>
        <p className="flex gap-2">
          Height: <p className="font-bold">{customer.height}</p>
        </p>
        <p className="flex gap-2">
          Member Ship Details :
          <p className="font-bold">{customer.membershipType} Months</p>
          <p className="font-bold">
            {capitalizeFirstLetter(customer.membershipStatus)}
          </p>
        </p>
        <p className="flex gap-2">
          Membership Price
          <p className="font-bold">{customer.membershipPrice} TL</p>
        </p>
        <p className="flex gap-2">
          Coach:
          <p className="font-bold">
            {customer.coachPT ? customer.coachPT : "Have not assigned yet"}
          </p>
        </p>
      </div>

      <Link href={`#`}>More Details..</Link>
    </div>
  );
};

export default CustomerDetailsModal;
