import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        {
          expiresIn: '1d',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException(`Email e/ou senha inválidos`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(`Email e/ou senha inválidos`);
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException(`Email está incorreto`);
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: '1d',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );
    console.log(token);

    await this.mailer.sendMail({
      subject: 'Recuperação de senha',
      to: 'cryan.alves26@gmail.com',
      template: 'forget',
      context: { name: user.name, token },
    });

    return { success: true };
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });

      const { email } = this.jwtService.decode(token) as { email: string };

      const userCompare = await this.usersRepository.findOneBy({
        email,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é invalido');
      }

      if (await bcrypt.compare(password, userCompare.password)) {
        return { message: 'O Usuário ja usa essa senha' };
      }

      password = await bcrypt.hash(password, await bcrypt.genSalt());

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.show(Number(data.id));

      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
