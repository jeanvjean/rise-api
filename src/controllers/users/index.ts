import { UserInterface } from './../../modules/interfaces/interface.users';
import {Response, Request, RequestHandler} from 'express';
import Ctrl from '../ctrl';
import User from '../../modules/users';
import enums from '../../configs/enums';
import { user } from '../../modules';

const UserModule = user

class UserController extends Ctrl {
    private module: User;
    constructor(module: User) {
      super();
      this.module = module;
    }

    create(): RequestHandler {
      return async (req: Request, res: Response) => {
        try {
          const data: UserInterface | undefined = await UserModule.create({...req.body});
          this.ok(res, enums.RESOURCE_CREATED('user'), data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }

    getUsers(): RequestHandler {
      return async(req: Request, res: Response) => {
        try {
          // @ts-ignore
          const data: UserInterface[] | undefined = await UserModule.getUsers(req.query);
          this.ok(res, enums.RESOURCE_FETCHED('users'), data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      }
    }

    login(): RequestHandler {
      return async(req: Request, res: Response) => {
        try {
          // @ts-ignore
          const { user, token } = req;
          this.ok(res, 'login successfull', { ...user, token });
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      }
    }
}

export default UserController;
