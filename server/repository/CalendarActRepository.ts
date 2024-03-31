import CalenderAcv from "../models/CalenderAcv";
import RepositoryBase from "./Repository";

export class CalendarActRepository extends RepositoryBase<typeof CalenderAcv> {
  constructor() {
    super(CalenderAcv);
  }
}
