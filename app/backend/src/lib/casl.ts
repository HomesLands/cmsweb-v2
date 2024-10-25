/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoQuery,
} from "@casl/ability";
import {
  User,
  Unit,
  ApprovalLog,
  AssignedUserApproval,
  Authority,
  Company,
  Department,
  File,
  Permission,
  Product,
  ProductRequisitionForm,
  ProductWarehouse,
  Project,
  RFID,
  RequestProduct,
  Role,
  Site,
  TemporaryProduct,
  UserApproval,
  UserDepartment,
  UserRole,
  Warehouse,
  PurchaseProduct,
  ProductPurchaseForm,
} from "@entities";
import { Action } from "@enums";
import { join } from "path";
import { logger } from "./logger";

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Unit
      | typeof ApprovalLog
      | typeof AssignedUserApproval
      | typeof Authority
      | typeof Company
      | typeof Department
      | typeof File
      | typeof Permission
      | typeof Product
      | typeof ProductRequisitionForm
      | typeof ProductWarehouse
      | typeof Project
      | typeof RFID
      | typeof RequestProduct
      | typeof Role
      | typeof Site
      | typeof TemporaryProduct
      | typeof UserApproval
      | typeof UserDepartment
      | typeof UserRole
      | typeof Warehouse
      | typeof PurchaseProduct
      | typeof ProductPurchaseForm
    >
  | "all";
// Type declaration for Subjects
export type AppAbility = Ability<[Action, Subjects]>;

// Function to load a single entity by name
export async function loadEntity(entityName: string) {
  const entityDir = join(__dirname, "../entities");
  // Define possible file names
  const entityFiles = [`${entityName}.entity.ts`, `${entityName}.entity.js`];

  for (const entityFile of entityFiles) {
    try {
      const entityModule = await import(join(entityDir, entityFile));

      // Assuming each entity file exports the entity class as default or the first export
      const entityClass = entityModule[Object.keys(entityModule)[0]];

      return entityClass;
    } catch (error) {
      console.error(`Error loading entity ${entityName}:`, error);
    }
  }
}

export async function createAbilities(
  user: User
): Promise<Ability<[Action, Subjects], MongoQuery>> {
  const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
    Ability as AbilityClass<AppAbility>
  );

  if (user.userRoles) {
    await Promise.all(
      user.userRoles.map(async (userRole) => {
        return Promise.all(
          userRole.role.rolePermissions.map(async (rolePermission) => {
            const authority = rolePermission.permission?.authority;
            const resource = rolePermission.permission?.resource;

            if (authority?.nameNormalize && resource?.name) {
              let Entity = resource.name as any;
              if (resource.name !== "all")
                Entity = await loadEntity(resource.name);

              const action =
                Action[authority.nameNormalize as keyof typeof Action]; // Convert action to enum
              // Prepare the conditions for the `can` method
              const conditions = rolePermission.permission?.requiredOwner
                ? { createdBy: user.id }
                : {};

              logger.info("[cals]", {
                resource: resource.name,
                authority: authority.nameNormalize,
              });

              // Now that Entity is loaded, we can check permissions
              can(action, Entity, conditions);
            }
          })
        );
      })
    );
  }

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}
