import { Permission } from 'src/domain/entities/permission.entity';
import { PermissionResponseDto } from '../dtos/permission-response.dto';

export class PermissionMapper {
  static toResponseDto(permission: Permission): PermissionResponseDto {
    return {
      id: permission.getId().value,
      name: permission.getName(),
      description: permission.getDescription(),
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    };
  }
}
