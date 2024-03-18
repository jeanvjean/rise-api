import userModule from './users';
import {UserService} from '../services/index';

const user = new userModule({
  service: new UserService()
});

export {
  user
};
