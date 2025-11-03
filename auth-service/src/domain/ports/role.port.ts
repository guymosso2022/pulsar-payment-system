import { Role } from '../entities/role.entity';
import { RoleIdVO } from '../value-objects/role-id.vo';

export const IROLE_REPOSITORY_PORT = Symbol('IRoleRepositoryPort');
export interface IPermissionRepositoryPort {
  save(role: Role): Promise<Role>;
  findOneById(roleId: RoleIdVO): Promise<Role | null>;
}
