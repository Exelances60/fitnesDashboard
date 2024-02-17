import { capitalizeFirstLetter } from "@/utils/utils";
import { Badge } from "@tremor/react";

export const renderMembershipStatus = (membershipStatus: string) => {
  let color = "";
  switch (membershipStatus) {
    case "standart":
      color = "green";
      break;
    case "passive":
      color = "gray";
      break;
    case "vip":
      color = "violet";
      break;
    default:
      break;
  }
  return <Badge color={color}>{capitalizeFirstLetter(membershipStatus)}</Badge>;
};
