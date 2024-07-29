import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(data: CreateUserDTO) {
    if (await this.usersRepository.exists({ where: { email: data.email } })) {
      throw new BadRequestException('Email ja existe');
    }
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async list() {
    return this.usersRepository.find();
  }

  async show(id: number) {
    await this.existUser(id);
    return this.usersRepository.findOneBy({ id });
  }

  async updatePut(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.existUser(id);

    password = password;
    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.usersRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.show(id);
  }

  async updatePatch(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    const data: any = {};
    await this.existUser(id);

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = data.password;
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }

    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    await this.existUser(id);

    await this.usersRepository.delete(id);

    return true;
  }

  async existUser(id: number) {
    if (!(await this.usersRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`O Usuário ${id} não encontrado`);
    }
  }
}
