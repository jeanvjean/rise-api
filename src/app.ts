import {json, urlencoded} from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import conf from './configs/databaseConnection';
import AppConfig from './configs/app';
import {ctrl} from './controllers';
import router from './routes';
import logger from './utils/logger';
import env from './configs/env';

// @ts-ignore
global.logger = logger

class Application {
	public express: express.Application

	constructor() {
	  this.express = express();
	  this.configure();
	  this.handleExceptions();
	  this.express.listen(AppConfig.port, () => {
			// @ts-ignore
			logger.info(`${AppConfig.appName} is listening at port ${AppConfig.port}`);
			// @ts-ignore				
			conf.postgresDb.connect().then((con: any) => {
				// @ts-ignore
				logger.info(`connected to ${con.client.database} database`);
			});
	   });
	}

	private configure(): void {
	  this.express.use(morgan('dev'));
	  this.express.use(json({limit: AppConfig.clientBodyLimit}));
	  this.express.use(urlencoded({extended: true}));
	  this.express.use('*', cors());
	  this.express.options('*', cors());
	  this.express.use(helmet());
	  this.express.use('/api/v1', router);
	}

	private handleExceptions(): void {
	  this.express.use(ctrl.handleNotFound);
	  this.express.use(ctrl.handleError);
	}
}

export default Application;
