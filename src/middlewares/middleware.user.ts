import { UserInterface } from './../modules/interfaces/interface.users';
import Ctrl from '../controllers/ctrl';
import {Request, Response, NextFunction} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {UserService} from '../services';
import enums from '../configs/enums';

// invoke service
const serviceModule = new UserService();

type serviceProps = {
  service: typeof serviceModule
}


export default class DriverMiddleware extends Ctrl {
  constructor(props: serviceProps) {
    super();
  }

  public getUser(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {body} = req;
        const payload: string = body.email;
        const user: UserInterface = await serviceModule.getUser({ email: payload });
        if (user) {
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
}
