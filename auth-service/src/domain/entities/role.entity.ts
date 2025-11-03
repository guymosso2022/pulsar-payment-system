import { PermissionVO } from '../value-objects/permission.vo';
import { PermissionsVO } from '../value-objects/permissions.vo';
import { RoleIdVO } from '../value-objects/role-id.vo';

export class Role {
  constructor(
    private readonly id: RoleIdVO,
    private readonly name: string,
    private permissions?: PermissionsVO,
    private readonly description?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
    this.permissions = permissions ?? PermissionsVO.create([]);
  }

  public static create(
    id: RoleIdVO,
    name: string,
    permissions?: PermissionsVO,
    description?: string,
  ): Role {
    return new Role(
      id,
      name,
      permissions ?? PermissionsVO.create([]),
      description,
    );
  }

  public addPermission(permission: PermissionVO) {
    this.permissions = this.permissions!.addPermission(permission);
  }

  public removePermission(permission: PermissionVO) {
    this.permissions = this.permissions!.removePermission(permission);
  }

  public getPermissions(): PermissionsVO {
    return this.permissions!;
  }

  getId(): RoleIdVO {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }
}
