import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto/auth.dto';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService implements OnModuleInit {
  private auth: admin.auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    await this.firebaseService.getFirebaseApp();
    this.auth = admin.auth();
  }

  async signUp(data: SignUpDto, res: Response) {
    try {
      const userRecord = await this.auth.createUser({
        email: data.email,
        password: data.password,
        displayName: `${data.firstname} ${data.lastname}`,
      });

      return res.status(200).json({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoUrl: userRecord.photoURL,
      });
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new HttpException(error.errorInfo.message, HttpStatus.BAD_REQUEST);
    }
  }

  //   async signIn(data: SignInDto) {
  //     try {
  //       const decodedToken = await this.auth.verifyIdToken(data.idToken);

  //       const uid = decodedToken.uid;
  //       const user = await this.auth.getUser(uid);
  //       const customToken = await this.auth.createCustomToken(uid);

  //       return {
  //         message: 'Successfully signed in!',
  //         user,
  //         customToken,
  //       };
  //     } catch (error) {
  //       console.error('Error verifying ID token', error);
  //       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  //     }
  //   }

  async signIn(req: Request, res: Response) {
    try {
      const idToken = req.cookies['idToken'];
      const decodedToken = await this.auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const user = await this.auth.getUser(uid);

      res.cookie('idToken', idToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error verifying ID token:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  async generateToken(uid: string): Promise<string> {
    try {
      const customToken = await this.auth.createCustomToken(uid);
      return customToken;
    } catch (error) {
      console.error('Error generating custom token:', error);
      throw new HttpException('Failed to generate token', 500);
    }
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token provided' });
    }

    try {
      const newIdToken = await admin.auth().verifyIdToken(refreshToken, true);

      res.cookie('idToken', newIdToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
      });

      return res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(401).json({ message: 'Token refresh failed' });
    }
  }
}
