import { Unit } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UnitRepository extends BaseRepository<Unit> {
  constructor() {
    super(Unit, dataSource);
  }
}

export default new UnitRepository();