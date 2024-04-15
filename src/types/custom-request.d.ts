import { Request } from 'express';
import { UsersDocument } from 'src/modules/auth/schema/user.schema';
Request;

declare module 'express' {
  interface Request {
    user?: UsersDocument;
  }
}
