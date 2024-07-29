import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDto: CreateUserDTO = {
  name: 'Teste',
  email: 'j5z6v@example.com',
  password: '123456',
  birthAt: '2020-01-01',
  role: Role.User,
};
