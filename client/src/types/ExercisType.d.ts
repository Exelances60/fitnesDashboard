import { Global } from "@/global";

export type ExerciseType = {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  secondaryMuscle: string[];
  instructions: string[];
};

export type fetchExersiceType = Global.FetchExerciseType;
