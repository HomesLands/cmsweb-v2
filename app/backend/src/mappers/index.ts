import { addProfile, createMapper, extend } from "@automapper/core";
import { classes } from "@automapper/classes";
import { authMapper } from "./auth.mapper";
import { siteMapper } from "./site.mapper";
import { userMapper } from "./user.mapper";
import { projectMapper } from "./project.mapper";
import { unitMapper } from "./unit.mapper";
import { productMapper } from "./product.mapper";
import { companyMapper } from "./company.mapper";
import { productRequisitionFormMapper } from "./product-requisition-form.mapper";
import { approvalLogMapper } from "./approval-log.mapper";
import { userApprovalMapper } from "./user-approval.mapper";
import { requestProductMapper } from "./request-product.mapper";
import { roleMapper } from "./role.mapper";
import { authorityMapper } from "./authority.mapper";
import { permissionMapper } from "./permission.mapper";
import { userRoleMapper } from "./user-role.mapper";
import { departmentMapper } from "./department.mapper";
import { userDepartmentMapper } from "./user-department.mapper";
import { assignedUserApprovalMapper } from "./assigned-user-approval.mapper";
import { warehouseMapper } from "./warehouse.mapper";
import { productWarehouseMapper } from "./product-warehouse.mapper";
import { temporaryProductMapper } from "./temporary-product.mapper";
import { resourceMapper } from "./resource.mapper";
import { rolePermissionMapper } from "./role-permission.mapper";
import { productPurchaseFormMapper } from "./product-purchase-form.mapper";
import { purchaseProductMapper } from "./purchase-product.mapper";
import { baseMapper } from "./base.mapper";
import { notificationMapper } from "./notification.mapper";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

addProfile(mapper, authMapper);

addProfile(mapper, userMapper, extend(baseMapper(mapper)));
addProfile(mapper, projectMapper, extend(baseMapper(mapper)));
addProfile(mapper, departmentMapper, extend(baseMapper(mapper)));
addProfile(mapper, userDepartmentMapper, extend(baseMapper(mapper)));
addProfile(mapper, siteMapper, extend(baseMapper(mapper)));
addProfile(mapper, companyMapper, extend(baseMapper(mapper)));

addProfile(mapper, resourceMapper, extend(baseMapper(mapper)));
addProfile(mapper, authorityMapper, extend(baseMapper(mapper)));
addProfile(mapper, permissionMapper, extend(baseMapper(mapper)));
addProfile(mapper, rolePermissionMapper, extend(baseMapper(mapper)));
addProfile(mapper, roleMapper, extend(baseMapper(mapper)));
addProfile(mapper, userRoleMapper, extend(baseMapper(mapper)));

addProfile(mapper, unitMapper, extend(baseMapper(mapper)));
addProfile(mapper, warehouseMapper, extend(baseMapper(mapper)));
addProfile(mapper, productMapper, extend(baseMapper(mapper)));
addProfile(mapper, notificationMapper, extend(baseMapper(mapper)));
addProfile(mapper, productWarehouseMapper, extend(baseMapper(mapper)));

addProfile(mapper, assignedUserApprovalMapper, extend(baseMapper(mapper)));
addProfile(mapper, requestProductMapper, extend(baseMapper(mapper)));
addProfile(mapper, temporaryProductMapper, extend(baseMapper(mapper)));
addProfile(
  mapper,
  productRequisitionFormMapper,
  extend(baseMapper(mapper))
  // typeConverter(Date, String, (deadlineApproval) =>
  //   moment(deadlineApproval).toString()
  // ),
  // typeConverter(String, Date, (deadlineApproval) =>
  //   moment(deadlineApproval).toDate()
  // )
);
addProfile(mapper, userApprovalMapper, extend(baseMapper(mapper)));
addProfile(mapper, approvalLogMapper, extend(baseMapper(mapper)));
addProfile(mapper, productPurchaseFormMapper, extend(baseMapper(mapper)));
addProfile(mapper, purchaseProductMapper, extend(baseMapper(mapper)));
