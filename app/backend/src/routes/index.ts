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

import { authMiddleware } from "@middlewares";
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

const baseApi: Router = Router();

export const registerRoutes = (app: Express) => {
  baseApi.use(authMiddleware.authenticate);

  baseApi.use("/auth", authRoute);

  baseApi.use("/users", userRoute);

  baseApi.use("/files", fileRoute);

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

  app.use("/api/v1", baseApi);

  app.options("*", (req: Request, res: Response) => res.status(StatusCodes.OK));

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new GlobalError(ErrorCodes.PATH_NOT_FOUND);
    next(err);
  });
};
