import { User } from "@entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository extends Repository<User> {}
