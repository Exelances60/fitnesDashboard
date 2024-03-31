import Owner from "../models/Owner";
import RepositoryBase from "./Repository";

export class UserRepository extends RepositoryBase<typeof Owner> {
  constructor() {
    super(Owner);
  }
}
