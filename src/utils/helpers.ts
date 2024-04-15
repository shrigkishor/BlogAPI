import * as bcrypt from 'bcryptjs';

export async function hashPassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, Number(process.env.PASSWORD_SALT));
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}
