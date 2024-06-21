import RepositoryBase from "./Repository";
import Chat from "../models/Chat";

export class ChatRepository extends RepositoryBase<typeof Chat> {
  constructor() {
    super(Chat);
  }
}
