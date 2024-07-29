import { Role } from '../enums/role.enum';
import { User } from '../user/entity/user.entity';

export const userEntityList: User[] = [
  {
    id: 1,
    name: 'Ryan',
    email: 'j5z6v@example.com',
    password: '$2b$10$ZiTfgILkdTymqoJ3g6oWOOUrYwLuwhenOGLeU7LQXR31tLE8sTijC',
    birthAt: new Date('2000-01-01'),
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Taylor',
    email: 'j5z6v@example.com',
    password: '$2b$10$ZiTfgILkdTymqoJ3g6oWOOUrYwLuwhenOGLeU7LQXR31tLE8sTijC',
    birthAt: new Date('2000-01-01'),
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Jefin',
    email: 'j5z6v@example.com',
    password: '$2b$10$ZiTfgILkdTymqoJ3g6oWOOUrYwLuwhenOGLeU7LQXR31tLE8sTijC',
    birthAt: new Date('2000-01-01'),
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
