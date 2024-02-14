import { capitalizeFirstLetter } from "@/utils/utils";

export const renderMembershipStatus = (membershipStatus: string) => {
  let className = "";
  switch (membershipStatus) {
    case "standart":
      className = "text-green-600";
      break;
    case "passive":
      className = "text-red-500";
      break;
    case "vip":
      className = "text-purple-600";
      break;
    default:
      break;
  }
  return <p className={className}>{capitalizeFirstLetter(membershipStatus)}</p>;
};
