import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from 'src/application/commands/create-permission.command';
import { Permission } from 'src/domain/entities/permission.entity';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { PermissionResponseDto } from '../dtos/permission-response.dto';
import { PermissionMapper } from '../mappers/permission.mapper';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    const command = new CreatePermissionCommand(
      createPermissionDto.name,
      createPermissionDto.description,
    );
    // Note: CommandBus.execute() returns any, type assertion needed for CQRS pattern
    const permission = (await this.commandBus.execute(command)) as Permission;
    return PermissionMapper.toResponseDto(permission);
  }
}
