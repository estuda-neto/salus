import { Injectable } from '@nestjs/common';
import crypto from "crypto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
    private readonly secretKey: Buffer;
    private static readonly ENCRYPTION_ALGORITHM = "aes-256-gcm";
    private static readonly IV_LENGTH = 12;
    private static readonly TAG_LENGTH = 16;

    constructor(private configService: ConfigService) {
        const envSecret =  this.configService.get<string>('TOKEN_SECRET') || "default_secret_32_bytes_long";
        this.secretKey = Buffer.alloc(32); // 256 bits = 32 bytes
        const keyBytes = Buffer.from(envSecret, "utf-8");
        keyBytes.copy(this.secretKey, 0, 0, Math.min(keyBytes.length, this.secretKey.length));
    }

    public async generateToken(email: string): Promise<string> {
        const iv = crypto.randomBytes(TokensService.IV_LENGTH);
        const cipher = crypto.createCipheriv(TokensService.ENCRYPTION_ALGORITHM, this.secretKey, iv, { authTagLength: TokensService.TAG_LENGTH });

        const tokenData = `${email}:${this.secretKey.toString("utf-8")}`;
        const encrypted = Buffer.concat([cipher.update(tokenData, "utf-8"), cipher.final()]);
        const authTag = cipher.getAuthTag();

        // Concatenar iv, authTag e encryptedData para formar o token
        return Buffer.concat([iv, authTag, encrypted]).toString("base64");
    }

    // Método para descriptografar o token
    public async decryptToken(token: string): Promise<string> {
        const tokenBuffer = Buffer.from(token, "base64");

        // Extrair iv, authTag e encryptedData da string base64
        const iv = tokenBuffer.subarray(0, TokensService.IV_LENGTH);
        const authTag = tokenBuffer.subarray(TokensService.IV_LENGTH, TokensService.IV_LENGTH + TokensService.TAG_LENGTH);
        const encryptedData = tokenBuffer.subarray(TokensService.IV_LENGTH + TokensService.TAG_LENGTH);

        const decipher = crypto.createDecipheriv(TokensService.ENCRYPTION_ALGORITHM, this.secretKey, iv, { authTagLength: TokensService.TAG_LENGTH });
        decipher.setAuthTag(authTag);

        // Descriptografar os dados
        try {
            const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
            return decrypted.toString("utf-8");
        } catch (error) {
            console.error("Erro ao descriptografar:", error);
            throw new Error("Erro ao descriptografar o token");
        }
    }

    // Método para validar o token
    public async validateToken(token: string, email: string): Promise<boolean> {
        try {
            const decryptedData = await this.decryptToken(token);
            const [decryptedEmail, secret] = decryptedData.split(":");

            // Verificar se o e-mail e a chave secreta correspondem
            return decryptedEmail === email && secret === this.secretKey.toString("utf-8");
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
