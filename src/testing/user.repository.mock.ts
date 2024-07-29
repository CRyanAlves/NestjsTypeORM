import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    exists: jest.fn().mockReturnValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityList[0]),
    find: jest.fn().mockResolvedValue(userEntityList),
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
