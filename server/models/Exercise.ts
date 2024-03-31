import { Schema, model } from "mongoose";

const ModelSchema = Schema;

export interface IExercise extends Document {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  secondaryMuscle: string[];
  instructions: string[];
}

const exerciseSchema = new ModelSchema<IExercise>({
  bodyPart: {
    type: String,
    require: true,
  },
  equipment: {
    type: String,
    require: true,
  },
  gifUrl: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  secondaryMuscle: {
    type: Array.of(String),
    require: true,
  },
  instructions: {
    type: Array.of(String),
    require: true,
  },
});

const Exercise = model<IExercise>("Exercise", exerciseSchema);

export default Exercise;
