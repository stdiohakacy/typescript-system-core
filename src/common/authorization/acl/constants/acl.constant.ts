import { AccessControl } from 'accesscontrol';
import { ENUM_ACL_ROLE_TYPE } from './acl.role.enum.constant';

export const ac = new AccessControl();

ac.grant(ENUM_ACL_ROLE_TYPE.USER)
    .createOwn('user')
    .deleteOwn('user')
    .readAny('user')
    .grant(ENUM_ACL_ROLE_TYPE.ADMIN)
    .extend(ENUM_ACL_ROLE_TYPE.USER)
    .updateAny('user')
    .deleteAny('user');

export const ACL_PERMISSION_TYPE_META_KEY = 'aclPermissionMetaKey';
export const ACL_ROLE_TYPE_META_KEY = 'aclRoleTypeMetaKey';
export const ACL_RESOURCE_TYPE_META_KEY = 'aclResourceTypeMetaKey';
