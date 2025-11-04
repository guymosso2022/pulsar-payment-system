import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IPERMISSION_REPOSITORY_PORT,
  IPermissionRepositoryPort,
} from 'src/domain/ports/permission.port';
import { GetAllPermissionQuery } from '../get-all-permission.query';

@QueryHandler(GetAllPermissionQuery)
export class GetAllPermissionHandler
  implements IQueryHandler<GetAllPermissionQuery>
{
  constructor(
    @Inject(IPERMISSION_REPOSITORY_PORT)
    private readonly permissionRepository: IPermissionRepositoryPort,
  ) {}

  async execute(query: GetAllPermissionQuery) {
    const skip = (query.page - 1) * query.limit;
    return await this.permissionRepository.findAll(skip, query.limit);
  }
}
