import { dataSource } from "@configs/index";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

// note: Tạo thêm interface chung cho các trường dữ liệu lấy ra từ T để định nghĩa kiểu trả về
type EntityColumnsOnly<T> = {
  [P in keyof T as T[P] extends Function ? never : P]: T[P];
};

export class BaseRepository<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = dataSource.getRepository(entity);
  }

  public async create(data: any): Promise<any | undefined> {
    console.log({ dataRegisterRespo: data });
    const dataCreated = await this.repository.create(data);
    const dataSaved = await this.repository.save(dataCreated);
    return dataSaved;
  }

  public async findAll(): Promise<any | undefined> {
    return await this.repository.find();
  }

  public async findOneBy(data: any): Promise<any | undefined> {
    return await this.repository.findOneBy(data);
  }

  public async findOneAndUpdateById(
    idQuery: any,
    dataUpdate: any
  ): Promise<any | undefined> {
    await this.repository.update(idQuery, dataUpdate);
    return await this.repository.findOneBy({ id: idQuery });
  }

  public async delete(data: any): Promise<any | undefined> {
    return await this.repository.delete(data);
  }
}
