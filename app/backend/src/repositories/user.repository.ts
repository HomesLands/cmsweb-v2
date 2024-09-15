import { User } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User, dataSource);
  }

  public async findByUsername(username: string): Promise<User | null> {
    return this.findOneBy({ username });
  }

  public async findAllUsers(): Promise<User[] | []> {
    return this.find();
  }
}

export default new UserRepository();
