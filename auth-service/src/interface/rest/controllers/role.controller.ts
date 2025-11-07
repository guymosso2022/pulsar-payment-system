import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from 'src/application/commands/create-role.command';
import { Role } from 'src/domain/entities/role.entity';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleResponseDto } from '../dtos/role-response.dto';
import { RoleMapper } from '../mappers/role.mapper';

@Controller('roles')
export class RoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    const command = new CreateRoleCommand(
      createRoleDto.name,
      createRoleDto.description,
      createRoleDto.permissions,
    );
    // Note: CommandBus.execute() returns any, type assertion needed for CQRS pattern
    const role = (await this.commandBus.execute(command)) as Role;
    return RoleMapper.toResponseDto(role);
  }
}
