import { Unit } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UnitRepository extends BaseRepository<Unit> {
  constructor() {
    super(Unit, dataSource);
  }
  public async findAllUnits(): Promise<Unit[] | []> {
    return this.find();
  }
}

export default new UnitRepository();