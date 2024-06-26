import 'dotenv/config';

const {
    STAGING_PORT,
    NODE_ENV,
    DATABASE_STAGING_STRING,
    STAGING_PAPERTRAIL_HOST,
    STAGING_PAPERTRAIL_PORT
} = process.env;

export default {
    PORT: STAGING_PORT,
    NODE_ENV: NODE_ENV,
    DATABASE_STRING: DATABASE_STAGING_STRING,
    PAPERTRAIL_HOST: STAGING_PAPERTRAIL_HOST,
    PAPERTRAIL_PORT: STAGING_PAPERTRAIL_PORT
}