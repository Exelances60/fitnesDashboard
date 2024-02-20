import { CustomerType } from "@/types/Customer";
import Image from "next/image";
import DEFAULTCOACH from "@/../public/customer/defaultCoach.webp";
import React from "react";
import { ExerciseType } from "@/types/ExercisType";
import CustomerExerciseList from "./CustomerExersiceList";

const CustomerExersicesDetails = ({ customer }: { customer: CustomerType }) => {
  const coachImageUrl = `https://fitnesdashboard.onrender.com/${customer?.coachPT}`;
  const bodyPart: { [bodyPart: string]: ExerciseType[] } = {};

  customer.exercisePlan?.forEach((exercise) => {
    if (typeof exercise !== "string") {
      if (!bodyPart[exercise.bodyPart]) {
        bodyPart[exercise.bodyPart] = [];
      }
      bodyPart[exercise.bodyPart].push(exercise);
    }
  });

  return (
    <div className="w-full">
      <div className="flex  items-center w-[45%] gap-2 justify-center h-full">
        <div className="w-[50%] h-[200px] bg-gray-300 relative rounded-lg">
          <Image
            src={customer.coachPT ? coachImageUrl : DEFAULTCOACH.src}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p className="font-bold">
          {customer.coachPT ? customer.coachPT : "No Coach Assigned"}
        </p>
      </div>

      <div className="flex flex-col w-full h-full">
        <CustomerExerciseList bodyPart={bodyPart} customerId={customer._id} />
      </div>
    </div>
  );
};

export default CustomerExersicesDetails;
