import {Module} from '../module';
import {UserService} from 'services/index';
import { UserInterface } from '../../modules/interfaces/interface.users';

export type userPropInterface = {
  service: UserService;
}

type UserResponse = {
    data: UserInterface;
    status: string;
}

interface userResponseQueryInterface {
  page: string;
  per_page: string;
}


class userModule extends Module {
    private service: UserService;

    constructor(props: userPropInterface) {
      super();
      this.service = props.service;
    }

    public async create(data: UserInterface): Promise<UserInterface | undefined> {
      try {
        const { first_name, last_name, email, password } = data;
        const user = {
          first_name, 
          last_name,
          email,
          password
        };
        const userData = await this.service.createUser(user);
        return  userData;
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }

    public async getUsers(data: userResponseQueryInterface): Promise<UserInterface[] | undefined> {
      try {
        const { page, per_page } = data;
        const users = await this.service.getUsers({
          offset: (+page - 1) * +per_page,
          limit: +per_page
        })
        return users;
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }
}

export default userModule;
