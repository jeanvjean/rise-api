import userModule from './users';
import postModule from './posts';
import {
  UserService, 
  PostService
} from '../services/index';

const user = new userModule({
  service: new UserService(),
});

const post = new postModule({
  service: new PostService(),
});

export {
  user,
  post
};
