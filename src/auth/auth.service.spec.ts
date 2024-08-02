import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { authRegisterDto } from '../testing/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('Method Create Token', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    test('Method Check Token', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('Method Is Valid Token', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });
  describe('Authenticate', () => {
    test('Method Login', async () => {
      const result = await authService.login('ryan@gmail.com', '@cryan2006');
      expect(result).toEqual({ accessToken });
    });

    test('Method Forget', async () => {
      const result = await authService.forget('ryan@gmail.com');
      expect(result).toEqual({ success: true });
    });

    test('Method Reset', async () => {
      const result = await authService.reset('@cryan2007', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('Method Register', async () => {
      const result = await authService.register(authRegisterDto);
      expect(result).toEqual({ accessToken });
    });
  });
});
