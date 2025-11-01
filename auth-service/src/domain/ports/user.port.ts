import { User } from '../entities/user.entity';
import { UserIdVO } from '../value-objects/user-id.vo';

export const IUSER_REPOSITORY_PORT = Symbol('IAccountRepositoryPort');
export interface IUserRepositoryPort {
  save(user: User): Promise<User>;
  findOneById(userId: UserIdVO): Promise<User | null>;
}
