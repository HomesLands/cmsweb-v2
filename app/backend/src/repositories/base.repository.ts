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

  // public async findAll(option?: IPageOption): Promise<T[]> {
  //   if (option) {
  //     return await this.createQueryBuilder(option.builderFor)
  //       .orderBy(option.orderBy)
  //       .skip(option.skip)
  //       .take(option.take)
  //       .getMany();
  //   }
  //   return await this.repository.find();
  // }
}

export default BaseRepository;
