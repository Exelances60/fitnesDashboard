import { setHideModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/store";
import { capitalizeFirstLetter } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import NOUSERPHOTE from "@/../public/customer/noUser.webp";
import React from "react";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface CustomerEditModalProps {
  customer: CustomerType;
}

const CustomerDetailsModal = ({ customer }: CustomerEditModalProps) => {
  const dispatch = useAppDispatch();
  const { renderCurrency } = useCurrencyFormatter();
  return (
    <div className="flex flex-col  gap-5">
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <div className=" w-40 h-40 rounded-md relative">
          {customer.profilePicture ? (
            <Image
              src={`${customer.profilePicture}`}
              fill
              className="object-cover rounded-md"
              alt="profilePicture"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={NOUSERPHOTE}
              fill
              className="object-cover rounded-md"
              alt="profilePicture"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <p className="text-[#202224] font-bold text-lg">{customer.name}</p>
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="flex gap-2">
          📧 Email:
          <span className="font-bold">{customer.email}</span>
        </p>
        <p className="flex gap-2">
          📞 Phone: <span className="font-bold">+90{customer.phone}</span>
        </p>
        {customer.age < 18 ? (
          <p className="flex gap-2">
            📞 Parent Name:{" "}
            <span className="font-bold">{customer.parentPhone}</span>
          </p>
        ) : null}

        <p className="flex gap-2">
          🧬 Age: <span className="font-bold">{customer.age}</span>
        </p>
        <p className="flex gap-2">
          🔩 BodyWeight:{" "}
          <span className="font-bold">{customer.bodyWeight} KG</span>
        </p>
        <p className="flex gap-2">
          📏 Height: <span className="font-bold">{customer.height}</span>
        </p>
        <p className="flex gap-2">
          📄 Member Ship Details :
          <span className="font-bold">{customer.membershipType} Months</span>
          <span className="font-bold">
            {capitalizeFirstLetter(customer.membershipStatus)}
          </span>
        </p>
        <p className="flex gap-2">
          💵 Membership Price
          <span className="font-bold">
            {renderCurrency(customer.membershipPrice)}
          </span>
        </p>
        <p className="flex gap-2">
          🥋 Coach:
          <span className="font-bold">
            {typeof customer.coachPT === "string"
              ? customer.coachPT
              : capitalizeFirstLetter(customer.coachPT?.name || "")}
          </span>
        </p>
      </div>

      <Link
        href={`/dashboard/customer/${customer._id}`}
        onClick={() => {
          dispatch(setHideModal());
        }}
      >
        More Details
      </Link>
    </div>
  );
};

export default CustomerDetailsModal;
