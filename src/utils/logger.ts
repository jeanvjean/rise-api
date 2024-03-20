import env from '../configs/env'
import * as winston from 'winston'
import { PapertrailConnection, PapertrailTransport } from 'winston-papertrail';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const environment = env?.NODE_ENV || 'development'
  const isDevelopment = environment === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const papertrailConnection = new PapertrailConnection({
  host: `${env?.PAPERTRAIL_HOST as string}`.split('\r')[0],
  port: env?.PAPERTRAIL_PORT,
  hostname: 'boiler_ts',
  level: 'debug',
  logFormat: function(level:string, message: string) {
      return `${winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })} [${level}]::: ${message}`;
  }
});

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

let Logger: any;

switch (env?.NODE_ENV) {
  case 'production': Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
      new PapertrailTransport(papertrailConnection, {
        hostname: 'boiler_ts',
      }),
    ],
  });
  break;
  case 'development': Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
      new winston.transports.Console(),
      new PapertrailTransport(papertrailConnection, {
        hostname: 'boiler_ts',
      }),
    ],
  });
  break;
  case 'test': Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/test.log' }),
    ],
  });
  case 'staging': Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
      new PapertrailTransport(papertrailConnection, {
        hostname: 'boiler_ts',
      }),
    ],
  });    
    break;
  default: Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
      new winston.transports.Console(),
    ],
  });
    break;
}

export default Logger;
