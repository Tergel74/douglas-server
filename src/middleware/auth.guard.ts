import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const idToken = req.cookies.idToken;

    if (!idToken) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['user'] = decodedToken; // Attach the decoded token to the request object
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized', error: error.message });
    }
  }
}
