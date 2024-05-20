import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => {
  return {
    port: process.env.PORT || 9000,
    databaseUri: process.env.DATABASE_URI,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    allowedOrigins:process.env.CORS
  };
});
