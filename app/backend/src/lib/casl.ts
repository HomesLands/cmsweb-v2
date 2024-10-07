import { createMongoAbility, AbilityBuilder } from "@casl/ability";
import { User } from "@entities";

export async function constructAbilities(user: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  //   if (user.role === "admin") {
  //     can("manage", "all"); // Admins can manage everything
  //   } else {
  //     // Users can only edit and delete their own posts
  //     can("edit", "Post", { user: { id: user.id } });
  //     can("delete", "Post", { user: { id: user.id } });
  //     can("create", "Post"); // Users can create posts
  //   }

  return build();
}
