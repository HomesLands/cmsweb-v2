import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { InvalidToken } from "@entities";

class InvalidTokenRepository extends BaseRepository<InvalidToken> {
  constructor() {
    super(InvalidToken, dataSource);
  }
}

export default new InvalidTokenRepository();
