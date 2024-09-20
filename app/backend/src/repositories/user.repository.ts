import { User } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User, dataSource);
  }
}

export default new UserRepository();
