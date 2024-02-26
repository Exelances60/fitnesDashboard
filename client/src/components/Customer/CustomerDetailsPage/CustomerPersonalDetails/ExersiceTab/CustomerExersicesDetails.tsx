import { CustomerType } from "@/types/Customer";
import Image from "next/image";
import DEFAULTCOACH from "@/../public/customer/defaultCoach.webp";
import React from "react";
import { ExerciseType } from "@/types/ExercisType";
import CustomerExerciseList from "./CustomerExersiceList";
import CustomerExerciseTrainer from "./CustomerExerciseTrainer";

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
      <div className="flex items-center w-full gap-2 h-full">
        <Image
          src={customer.coachPT ? coachImageUrl : DEFAULTCOACH.src}
          alt="Picture of the author"
          width={150}
          height={200}
          className="rounded-lg"
        />

        <div>
          <p className="font-bold">
            {customer.coachPT ? customer.coachPT : "No Coach Assigned"}
          </p>
          {!customer.coachPT ? <CustomerExerciseTrainer /> : null}
        </div>
      </div>

      <div className="flex flex-col w-full h-full">
        <CustomerExerciseList bodyPart={bodyPart} customerId={customer._id} />
      </div>
    </div>
  );
};

export default CustomerExersicesDetails;