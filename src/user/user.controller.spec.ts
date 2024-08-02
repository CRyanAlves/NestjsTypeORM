import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../guards/Auth.guard';
import { RoleGuard } from '../guards/Role.guard';
import { userEntityList } from '../testing/user-entity-list.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { guardMock } from '../testing/guard.mock';
import { createUserDto } from '../testing/create-user-dto.mock';
import { updatePutUserDto } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDto } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controle', () => {
    test('Se os guards estão aplicados', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.createUser(createUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await userController.getAllUsers();

      expect(result).toEqual(userEntityList);
    });
    test('show method', async () => {
      const result = await userController.getUserById(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.updateUser(1, updatePutUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
    test('updatePartial method', async () => {
      const result = await userController.partialUpdateUser(
        1,
        updatePatchUserDto,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.deleteUser(1);

      expect(result).toEqual({ success: true });
    });
  });
});
