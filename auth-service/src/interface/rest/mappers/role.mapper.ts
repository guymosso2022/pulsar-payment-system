import { Role } from 'src/domain/entities/role.entity';
import { RoleResponseDto } from '../dtos/role-response.dto';

export class RoleMapper {
  static toResponseDto(role: Role): RoleResponseDto {
    const permissions = role.getPermissions()?.getPermissions() ?? [];
    const permissionIds = permissions.map((p) => p.getValue());

    return {
      id: role.getId().getValue(),
      name: role.getName(),
      description: role.getDescription(),
      permissions: permissionIds,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
