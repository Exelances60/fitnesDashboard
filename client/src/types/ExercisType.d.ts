interface ExerciseType {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  secondaryMuscle: string[];
  instructions: string[];
}

interface fetchExersiceType {
  exercises: ExerciseType[];
  totalExercisesCount: number;
  currentPage: number;
  pageSize: number;
}
