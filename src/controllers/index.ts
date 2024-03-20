import { user, post } from '../modules';
import Ctrl from './ctrl';
import UserCtrl from './users';
import PostCtrl from './posts';

export const ctrl = new Ctrl();
export const UserController = new UserCtrl(user);
export const PostController = new PostCtrl(post);
