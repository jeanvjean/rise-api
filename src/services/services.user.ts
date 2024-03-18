import UserQueries from '../queries/query.users';
import DatabaseQueryRunner from '../configs/database';

class UserService {
  public async createUser(dataQuery: object) {
    const [ data ] = await DatabaseQueryRunner.transaction(UserQueries.createUser, dataQuery);
    return data;
  }

  public async getUser(data: object) {
    return await DatabaseQueryRunner.singleTransaction(UserQueries.getUser, data);
  }

  public async getUsers(data: object) {
    return DatabaseQueryRunner.transaction(UserQueries.getUsers, data); 
  }
}

export default UserService;
