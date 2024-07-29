import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDTO = {
  name: 'Teste',
  email: 'j5z6v@example.com',
  password: '123456',
  birthAt: '2020-01-01',
  role: Role.User,
};
