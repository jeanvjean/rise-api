import pgPromise = require('pg-promise');
import env from './env';

const pg = pgPromise({promiseLib: global, noWarnings: true});
class DbConnection {
	static NODE_ENV = `${env?.NODE_ENV}`;

	static databaseString = env?.DATABASE_STRING;

	static postgresDb = pg(`${DbConnection.databaseString}`);
}

export default DbConnection;
