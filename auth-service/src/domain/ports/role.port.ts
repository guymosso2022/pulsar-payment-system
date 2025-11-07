import { Role } from '../entities/role.entity';
import { RoleIdVO } from '../value-objects/role-id.vo';

export const IROLE_REPOSITORY_PORT = Symbol('IRoleRepositoryPort');
export interface IRoleRepositoryPort {
  save(role: Role): Promise<Role>;
  findOneById(roleId: RoleIdVO): Promise<Role | null>;
}
