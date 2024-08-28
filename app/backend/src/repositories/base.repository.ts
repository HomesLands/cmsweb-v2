import { dataSource } from "@configs/index";
import {
  EntityTarget,
  FindOptionsWhere,
  ObjectId,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { IPageOption } from "types";

export class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(entityTarget: EntityTarget<T>) {
    this.repository = dataSource.getRepository(entityTarget);
  }

  public async save(data: T): Promise<T> {
    const createdData = this.repository.create(data);
    return await this.repository.save(createdData);
  }

  public async findAll(option?: IPageOption): Promise<T[]> {
    if (option) {
      return await this.repository
        .createQueryBuilder(option.builderFor)
        .orderBy(option.orderBy)
        .skip(option.skip)
        .take(option.take)
        .getMany();
    }
    return await this.repository.find();
  }

  public async findById(id: any): Promise<T | null> {
    return await this.repository.findOneBy({ id });
  }

  public async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>
  ): Promise<void> {
    await this.repository.delete(criteria);
  }
}
