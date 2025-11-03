import { InvalidPasswordDomainException } from '../exceptions/invalid-password.domain-exception';
import { UserAlreadyActivatedDomainException } from '../exceptions/user-already-activated-domain.exception';
import { UserAlreadyBlockedDomainException } from '../exceptions/user-already-blocked-domain.exception';
import { EmailVo } from '../value-objects/email.vo';
import { PermissionVO } from '../value-objects/permission.vo';
import { RoleVO } from '../value-objects/role.vo';
import { RolesVO } from '../value-objects/roles.vo';
import { UserStatusVO } from '../value-objects/status.vo';
import { UserIdVO } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserIdVO,
    private readonly email: EmailVo,
    private password: string,
    private firstName: string,
    private lastName: string,
    private phoneNumber: string,
    private roles: RolesVO = RolesVO.create([]),
    private status: UserStatusVO = UserStatusVO.create('ACTIVE'),
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
    this.setPassword(password);
  }

  public static create(
    id: UserIdVO,
    email: EmailVo,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roles?: RolesVO,
    status?: UserStatusVO,
  ): User {
    return new User(
      id,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roles ?? RolesVO.create([]),
      status ?? UserStatusVO.create('ACTIVE'),
    );
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

  public hasPermission(permission: PermissionVO): boolean {
    return this.roles
      .getRoles()
      .some((role) => role.getPermissions().hasPermission(permission));
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
