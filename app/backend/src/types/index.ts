import exp from "constants";

export type TEnv = {
  port: number;
  dataSource: {
    hostMySql: string;
    userMySql: string;
    passwordMySql: string;
    databaseMySql: string;
  };
  hashSalt: string;
  jwtSecret: string;
  passportSecret: string;
  duration: number;
  refreshableDuration: number;
};

export * from "./base.type";
export * from "./error-code.type";
export * from "./auth.type";
export * from "./site.type";
export * from "./project.type";
export * from "./unit.type";
export * from "./product.type";
export * from "./company.type";
export * from "./product-requisition-from.types";
export * from "./role.type";
export * from "./authority.type";
export * from "./permission.type";
export * from "./user-role.type";
export * from "./request-product.type";
export * from "./department.type";
export * from "./user-department.type";
export * from "./assigned-user-approval.type";
export * from "./warehouse.type";
export * from "./product-warehouse.type";
export * from "./temporary-product.type";
