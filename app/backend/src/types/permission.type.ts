export type TCreatePermissionRequestDto = {
  roleSlug?: string;
  authoritySlug?: string;
  requiredOwner?: boolean;
};

export type TUpdatePermissionRequestDto = {
  slug?: string;
  roleSlug?: string;
  authoritySlug?: string;
  requiredOwner?: boolean;
};
