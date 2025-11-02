import { PermissionIdVO } from '../value-objects/permission-id.vo';

export class Permission {
  constructor(
    private readonly id: PermissionIdVO,
    private readonly name: string,
    private readonly description?: string,
  ) {}

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  getId(): PermissionIdVO {
    return this.id;
  }
}
