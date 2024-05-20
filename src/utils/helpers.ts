import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { createCipheriv, createDecipheriv } from 'crypto';
const algorithm = 'aes-256-cbc';

export async function hashPassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, Number(process.env.PASSWORD_SALT));
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

export function generateTemporaryToken() {
  const unHashedToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex');

  return { unHashedToken, hashedToken };
}

export function encryptText(text: string) {
  const cipher = createCipheriv(
    algorithm,
    process.env.ENCRYPTION_KEY32,
    process.env.ENCRYPTION_KEY16,
  );
  let encryptedData = cipher.update(text, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

export function decryptText(encryptedText: string) {
  const decipher = createDecipheriv(
    algorithm,
    process.env.ENCRYPTION_KEY32,
    process.env.ENCRYPTION_KEY16,
  );
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
