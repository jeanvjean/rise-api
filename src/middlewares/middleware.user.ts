import { verifyToken, hash, compareData, signToken } from './../utils/hash';
import { UserInterface } from './../modules/interfaces/interface.users';
import Ctrl from '../controllers/ctrl';
import {Request, Response, NextFunction} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {UserService} from '../services';
import enums from '../configs/enums';

// invoke service
const serviceModule = new UserService();

interface decodedJWTInterface {
  id: string;
  email: string;
  message?: string
}

interface jwtEncryptInterface {
  hashed?: string;
}

type serviceProps = {
  service: typeof serviceModule
}


export default class DriverMiddleware extends Ctrl {
  constructor(props: serviceProps) {
    super();
  }

  public getUser(type = ''): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {body} = req;
        const payload: string = body.email;
        console.log({ payload });
        const user: UserInterface = await serviceModule.getUser({ email: payload, id: null });
        console.log({ user });
        if (user && type === 'create') {
          return this.errorResponse(req, res, enums.HTTP_BAD_REQUEST, enums.RESOURCE_EXISTS('user'));
        }
        // @ts-ignore
        req.user = user;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  public validateUserPassword(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const {user, body} = req;
        const isValidPassword = await compareData(body.password, user.password)
        if (!isValidPassword) {
          return this.errorResponse(req, res, enums.HTTP_BAD_REQUEST, 'invalid credentials');
        }
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  public getAuthorizationToken(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {headers} = req;
        // @ts-ignore
        const token: string = headers.authorization?.split(' ')[1];
        if(!token) {
          // @ts-ignore
          // logger.info('decoded that an auth token was not passed...', 'middlewares::middleware.user.ts');
          return this.errorResponse(req, res, enums.HTTP_BAD_REQUEST, 'please provide a token');
        }
        // @ts-ignore
        const verify: decodedJWTInterface | undefined = await verifyToken(token);
        if (!verify || verify?.message === 'jwt expired') {
          // @ts-ignore
          // logger.info('decoded that the token had expired', 'middlewares::middleware.user.ts');
          return this.errorResponse(req, res, enums.HTTP_BAD_REQUEST, 'Session expired');
        }
        // @ts-ignore
        const user = await serviceModule.getUser({ ...verify, id: verify.id || null });
        // @ts-ignore
        req.user = user;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  public generatePasswordHash(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const {body} = req;
        // @ts-ignore
        const hashData: string = await hash(body.password);
        // @ts-ignore
        req.body = {...body, password: hashData.hashed};
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  generateAuthToken(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const {email, id} = req.user;
        // @ts-ignore
        const token: string = await signToken({ email, id });
        // @ts-ignore
        req.token = token;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

}
