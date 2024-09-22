import { createMapper } from "@automapper/core";
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

export const mapper = createMapper({
  strategyInitializer: classes(),
});

authMapper(mapper);
siteMapper(mapper);
userMapper(mapper);
projectMapper(mapper);
unitMapper(mapper);
productMapper(mapper);
companyMapper(mapper);
productRequisitionFormMapper(mapper);
approvalLogMapper(mapper);
userApprovalMapper(mapper);
requestProductMapper(mapper);
roleMapper(mapper);
authorityMapper(mapper);
