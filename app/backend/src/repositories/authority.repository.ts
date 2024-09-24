import { Authority } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class AuthorityRepository extends BaseRepository<Authority> {
  constructor() {
    super(Authority, dataSource);
  }
}

export default new AuthorityRepository();
