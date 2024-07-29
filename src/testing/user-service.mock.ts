import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(userEntityList[0]),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    list: jest.fn().mockResolvedValue(userEntityList),
    delete: jest.fn().mockResolvedValue(true),
    existUser: jest.fn().mockResolvedValue(true),
    updatePut: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePatch: jest.fn().mockResolvedValue(userEntityList[0]),
  },
};
