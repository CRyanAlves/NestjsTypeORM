import { updatePatchUserDto } from './../testing/update-patch-user-dto.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDto } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDto } from '../testing/update-put-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('Method Create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Method List', async () => {
      const result = await userService.list();

      expect(result).toEqual(userEntityList);
    });

    test('Method Show', async () => {
      const result = await userService.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('Method Update', async () => {
      const result = await userService.updatePut(1, updatePutUserDto);

      expect(result).toEqual(userEntityList[0]);
    });

    test('Method UpdatePartial', async () => {
      const result = await userService.updatePatch(1, updatePatchUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('Method Delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
