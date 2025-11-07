export class RoleResponseDto {
  id: string;
  name: string;
  description?: string;
  permissions: string[]; // Array of permission IDs
  createdAt?: Date;
  updatedAt?: Date;
}
