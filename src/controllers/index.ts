import { user } from '../modules';
import Ctrl from './ctrl';
import UserCtrl from './users';

export const ctrl = new Ctrl();
export const UserController = new UserCtrl(user);
