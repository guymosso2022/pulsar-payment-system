import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from 'src/application/commands/create-permission.command';
import { GetAllPermissionQuery } from 'src/application/queries/get-all-permission.query';
import { Permission } from 'src/domain/entities/permission.entity';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { PaginatedResponseDto } from '../dtos/paginated-response.dto';
import { PermissionResponseDto } from '../dtos/permission-response.dto';
import { PermissionMapper } from '../mappers/permission.mapper';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get()
  async getAllPermissions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<PaginatedResponseDto<PermissionResponseDto>> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 20;

    const query = new GetAllPermissionQuery(pageNumber, limitNumber);
    const result = await this.queryBus.execute(query);

    return {
      data: result.data.map((permission) =>
        PermissionMapper.toResponseDto(permission),
      ),
      meta: result.meta,
    };
  }
}
