import {
  DataSource,
  DeepPartial,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from "typeorm";

class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  public async createAndSave(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.create(entity);
    return await this.save(newEntity);
  }
}

export default BaseRepository;
