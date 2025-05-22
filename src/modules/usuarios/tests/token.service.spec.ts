
import { ConfigService } from '@nestjs/config';
import { ApiError } from 'src/base/base.error';
import { TokensService } from '../token.service';

describe('TokensService', () => {
  let service: TokensService;
  let configService: ConfigService;

  const mockSecret = 'super_secure_token_32_bytes_key!';
  const mockEmail = 'test@example.com';

  beforeEach(() => {
    configService = {
      get: jest.fn((key: string) => {
        if (key === 'TOKEN_SECRET') return mockSecret;
        return null;
      }),
    } as any;

    service = new TokensService(configService);
  });

  it('must generate a valid token and decrypt correctly', async () => {
    const token = await service.generateToken(mockEmail);
    expect(typeof token).toBe('string');

    const decrypted = await service.decryptToken(token);
    expect(decrypted).toContain(mockEmail);
    expect(decrypted).toContain(mockSecret);
  });

  it('must validate a valid token with corresponding email', async () => {
    const token = await service.generateToken(mockEmail);
    const isValid = await service.validateToken(token, mockEmail);
    expect(isValid).toBe(true);
  });

  it('should return false for incorrect email', async () => {
    const token = await service.generateToken(mockEmail);
    const isValid = await service.validateToken(token, 'wrong@example.com');
    expect(isValid).toBe(false);
  });

  it('should throw error decrypting invalid token', async () => {
    const invalidToken = 'invalid_base64_token';

    await expect(service.decryptToken(invalidToken)).rejects.toThrow(ApiError);
    await expect(service.decryptToken(invalidToken)).rejects.toThrow('Error decrypting token');
  });

  it('should throw error when validating malformed token', async () => {
    const badToken = 'bad_token_string';
    await expect(service.validateToken(badToken, mockEmail)).rejects.toThrow(ApiError);
  });
});
