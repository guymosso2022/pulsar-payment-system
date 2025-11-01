import { UserAlreadyBlockedDomainException } from '../exceptions/user-already-blocked-domain.exception';
import { UserAlreadyActivatedDomainException } from '../exceptions/user-already-activated-domain.exception';
import { EmailVo } from '../value-objects/email.vo';
import { PermissionVO } from '../value-objects/permission.vo';
import { PermissionsVO } from '../value-objects/permissions.vo';
import { RoleVO } from '../value-objects/role.vo';
import { RolesVO } from '../value-objects/roles.vo';
import { UserStatusVO } from '../value-objects/status.vo';
import { UserIdVO } from '../value-objects/user-id.vo';
import { InvalidPasswordDomainException } from '../exceptions/invalid-password.domain-exception';

export class User {
  private password: string;

  constructor(
    private readonly id: UserIdVO,
    private readonly email: EmailVo,
    password: string,
    private firstName: string,
    private lastName: string,
    private phoneNumber: string,
    private roles: RolesVO = RolesVO.create([]),
    private permissions: PermissionsVO = PermissionsVO.create([]),
    private status: UserStatusVO = UserStatusVO.create('ACTIVE'),
  ) {
    this.setPassword(password);
  }

  public addRole(role: RoleVO) {
    this.roles = this.roles.addRole(role);
  }

  public removeRole(role: RoleVO) {
    this.roles = this.roles.removeRole(role);
  }

  public hasRole(role: RoleVO): boolean {
    return this.roles.hasRole(role);
  }

  public addPermission(permission: PermissionVO) {
    this.permissions = this.permissions.addPermission(permission);
  }

  public removePermission(permission: PermissionVO) {
    this.permissions = this.permissions.removePermission(permission);
  }

  public hasPermission(permission: PermissionVO): boolean {
    return this.permissions.hasPermission(permission);
  }

  public block() {
    if (this.status.isBlocked()) {
      throw new UserAlreadyBlockedDomainException(this.id.toString());
    }

    this.status = UserStatusVO.create('BLOCKED');
  }

  public activate() {
    if (this.status.isActive()) {
      throw new UserAlreadyActivatedDomainException(this.id.toString());
    }

    this.status = UserStatusVO.create('ACTIVE');
  }

  public isActive(): boolean {
    return this.status.isActive();
  }

  public isBlocked(): boolean {
    return this.status.isBlocked();
  }

  getId(): UserIdVO {
    return this.id;
  }

  getEmail(): EmailVo {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getRoles(): RolesVO {
    return this.roles;
  }

  getPermissions(): PermissionsVO {
    return this.permissions;
  }

  getStatus(): UserStatusVO {
    return this.status;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  private setPassword(password: string) {
    if (!password || password.length < 4) {
      throw new InvalidPasswordDomainException();
    }
    this.password = password;
  }
}
