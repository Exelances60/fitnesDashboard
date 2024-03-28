import RepositoryBase from "./Repository";
import Owner from "../models/Owner";

export class OwnerRepository extends RepositoryBase<typeof Owner> {
  constructor() {
    super(Owner);
  }
}
