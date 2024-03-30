import RepositoryBase from "./Repository";
import Exercise from "../models/Exercise";

export class ExerciseRepository extends RepositoryBase<typeof Exercise> {
  constructor() {
    super(Exercise);
  }
}
