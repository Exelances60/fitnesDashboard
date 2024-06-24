import React from "react";
import { Image } from "antd";
import DEFAULTCOACH from "@/../public/customer/defaultCoach.webp";
import CustomerExerciseList from "./CustomerExersiceList";
import CustomerExerciseTrainer from "./CustomerExerciseTrainer";
import { capitalizeFirstLetter } from "@/utils/utils";
import { MailOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";
import CustomerExersiceRemoveCoachButton from "./CustomerExersiceRemoveCoachButton";

const CustomerExersicesDetails = ({ customer }: { customer: CustomerType }) => {
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
      <h1 className="mb-2 font-bold text-lg">Coach</h1>
      <div className="flex items-center w-full gap-2 h-full">
        {typeof customer.coachPT === "string" || customer.coachPT === null ? (
          <Image
            src={DEFAULTCOACH.src}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <Image
            src={`${customer.coachPT?.profilePicture}`}
            alt="Profile Picture"
            width={100}
            className="rounded-md"
            height={100}
          />
        )}

        <div>
          <p className="font-bold">
            {typeof customer.coachPT === "string"
              ? customer.coachPT
              : capitalizeFirstLetter(customer.coachPT?.name || "")}
          </p>
          {typeof customer.coachPT === "string" ? null : (
            <p className="text-sm text-gray-400">
              <IdcardOutlined className="mr-2" />
              {customer.coachPT?.position}
            </p>
          )}
          {typeof customer.coachPT === "string" ? null : (
            <p className="text-sm text-gray-400">
              <PhoneOutlined className="mr-2" />
              {customer.coachPT?.phone}
            </p>
          )}
          {typeof customer.coachPT === "string" ? null : (
            <p className="text-sm text-gray-400">
              <MailOutlined className="mr-2" />
              {customer.coachPT?.email}
            </p>
          )}
          {customer.coachPT ? (
            typeof customer.coachPT === "string" ? null : (
              <p className="text-sm text-gray-400">
                <CustomerExersiceRemoveCoachButton customerId={customer._id} />
              </p>
            )
          ) : null}

          {!customer.coachPT ? (
            <CustomerExerciseTrainer customerId={customer._id} />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col w-full h-full">
        <CustomerExerciseList bodyPart={bodyPart} customer={customer} />
      </div>
    </div>
  );
};

export default CustomerExersicesDetails;
