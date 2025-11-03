import { Permission } from '../entities/permission.entity';
import { PermissionIdVO } from '../value-objects/permission-id.vo';

export const IPERMISSION_REPOSITORY_PORT = Symbol('IPermissionRepositoryPort');
export interface IPermissionRepositoryPort {
  save(user: Permission): Promise<Permission>;
  findOneById(permissionId: PermissionIdVO): Promise<Permission | null>;
}
