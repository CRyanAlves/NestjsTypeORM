import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn(),
    create: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    existUser: jest.fn(),
    updatePut: jest.fn(),
    updatePatch: jest.fn(),
  },
};
