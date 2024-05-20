import { INestApplication } from '@nestjs/common';
import { Request } from 'express';

export function RootRoutes(app: INestApplication) {
  app.use((req: Request, res, next) => {
    switch (req.originalUrl) {
      case '/':
        return 'Blog APIs';
      default:
        next();
    }
  });
}
