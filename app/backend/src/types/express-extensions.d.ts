import { Ability, AbilityTuple, MongoQuery } from "@casl/ability";

// declare namespace Express {
//   export interface Request {
//     userId?: string;
//     ability: MongoAbility<AbilityTuple, MongoQuery>;
//   }
// }

// Extend the Express namespace to include `ability` in the Request interface
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      ability?: Ability<AbilityTuple, MongoQuery>; // Add ability property with type MongoAbility
    }
  }
}
