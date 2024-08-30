import { User } from "@entities";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  public async findOnByUsername(username: string): Promise<User | null> {
    return this.repository.findOneBy({ username });
  }
}
