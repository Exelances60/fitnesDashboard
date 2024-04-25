import PendingAccount from "../models/PendingAccounts";
import RepositoryBase from "./Repository";

export class PeddingAccountRepository extends RepositoryBase<
  typeof PendingAccount
> {
  constructor() {
    super(PendingAccount);
  }
}
