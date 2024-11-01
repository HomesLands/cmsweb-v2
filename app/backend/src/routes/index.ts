import { Express, Router, Request, Response, NextFunction } from "express";

import { authRoute } from "@routes/auth.route";
import { productRoute } from "@routes/product.route";
import { userRoute } from "@routes/user.route";
import { healthCheckRoute } from "@routes/health-check.route";
import { siteRoute } from "@routes/site.route";
import { projectRoute } from "@routes/project.route";
import { unitRoute } from "@routes/unit.route";
import { companyRoute } from "@routes/company.route";
import { productRequisitionFormRoute } from "@routes/product-requisition-form.route";
import { requestProductRoute } from "@routes/request-product.route";

import { authMiddleware, storeMiddleware } from "@middlewares";
import { ErrorCodes, GlobalError } from "@exception";
import { StatusCodes } from "http-status-codes";
import { errorCodeRoute } from "./error-code.route";
import { roleRoute } from "./role.route";
import { authorityRoute } from "./authority.route";
import { permissionRoute } from "./permission.route";
import { userRoleRoute } from "./user-role.route";
import { userApprovalRoute } from "./user-approval.route";
import { departmentRoute } from "./department.route";
import { userDepartmentRoute } from "./user-department.route";
import { assignedUserApprovalRoute } from "./assigned-user-approval.route";
import { warehouseRoute } from "./warehouse.route";
import { productWarehouseRoute } from "./product-warehouse.route";
import { fileRoute } from "./file.route";
import { resourceRoute } from "./resource.route";
import { rolePermissionRoute } from "./role-permission.route";
import { productPurchaseFormRoute } from "./product-purchase-form.route";
import { databaseRoute } from "./database.route";
import { env } from "@constants";
import { notificationRoute } from "./notification.route";

const baseApi: Router = Router();

export const registerRoutes = (app: Express) => {
  baseApi.use(authMiddleware.authenticate, storeMiddleware.handler);

  baseApi.use("/auth", authRoute);

  baseApi.use("/users", userRoute);

  baseApi.use("/files", fileRoute);

  baseApi.use("/productPurchaseForms", productPurchaseFormRoute);

  baseApi.use("/products", productRoute);

  baseApi.use("/productWarehouses", productWarehouseRoute);

  baseApi.use("/warehouses", warehouseRoute);

  baseApi.use("/requestProducts", requestProductRoute);

  baseApi.use("/sites", siteRoute);

  baseApi.use("/units", unitRoute);

  baseApi.use("/companies", companyRoute);

  baseApi.use("/projects", projectRoute);

  baseApi.use("/departments", departmentRoute);

  baseApi.use("/productRequisitionForms", productRequisitionFormRoute);

  baseApi.use("/healthCheck", healthCheckRoute);

  baseApi.use("/errorCodes", errorCodeRoute);

  baseApi.use("/roles", roleRoute);

  baseApi.use("/authorities", authorityRoute);

  baseApi.use("/permissions", permissionRoute);

  baseApi.use("/userRoles", userRoleRoute);

  baseApi.use("/userApprovals", userApprovalRoute);

  baseApi.use("/userDepartments", userDepartmentRoute);

  baseApi.use("/assignedUserApprovals", assignedUserApprovalRoute);

  baseApi.use("/resources", resourceRoute);

  baseApi.use("/rolePermissions", rolePermissionRoute);

  baseApi.use("/database", databaseRoute);

  baseApi.use("/notifications", notificationRoute);

  app.use(`/api/${env.tag}`, baseApi);

  app.options("*", (req: Request, res: Response) => res.status(StatusCodes.OK));

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new GlobalError(ErrorCodes.PATH_NOT_FOUND);
    next(err);
  });
};
