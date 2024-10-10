import { Ability, MongoQuery } from "@casl/ability";
import { Action } from "@enums";
import { Subjects } from "@lib";

// Extend the Express namespace to include `ability` in the Request interface
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      ability?: Ability<[Action, Subjects], MongoQuery>; // Add ability property with type MongoAbility
    }
  }
}
