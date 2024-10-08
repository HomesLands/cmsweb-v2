import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { User } from "@entities";
import { Action } from "@enums";

export type Subjects = InferSubjects<typeof User> | "all";
export type AppAbility = Ability<[Action, Subjects]>;

export async function createAbilities(user: User) {
  const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
    Ability as AbilityClass<AppAbility>
  );
  can(Action.Update, User, { id: user.id });

  // user.userRoles?.forEach((userRole) => {
  //   userRole.role.permissions.forEach((permission) => {
  //     const authority = permission.authority;
  //     if (authority.nameNormalize && authority.resource?.name) {
  //       const action = Action[authority.nameNormalize as keyof typeof Action]; // Convert action to enum
  //     }
  //   });
  // });

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}
