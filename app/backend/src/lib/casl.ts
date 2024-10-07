import { Ability, AbilityBuilder } from "@casl/ability";
import { User } from "@entities";

export async function constructAbilities(user: User) {
  const { can, build } = new AbilityBuilder(Ability);

  user.userRoles?.forEach((userRole) => {
    userRole.role.permissions.forEach((permission) => {
      const authority = permission.authority;
      // if (authority.nameNormalize && authority.resource?.name)
      //   can(authority.nameNormalize, authority.resource.name);
      if (authority.nameNormalize)
        can(authority.nameNormalize, "User", {
          createdBy: user.id,
        });
    });
  });

  return build();
}
