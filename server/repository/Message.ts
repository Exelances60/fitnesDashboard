import RepositoryBase from "./Repository";
import Message from "../models/Message";

export class MessageRepository extends RepositoryBase<typeof Message> {
  constructor() {
    super(Message);
  }
}
