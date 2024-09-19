import { Company } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class CompanyRepository extends BaseRepository<Company> {
  constructor() {
    super(Company, dataSource);
  }
}

export default new CompanyRepository();