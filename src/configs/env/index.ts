import development from "./development";
import staging from "./staging";
import test from "./test";
import production from "./production";

const { NODE_ENV } = process.env;

export default {
    development,
    staging,
    test,
    production
}[NODE_ENV || 'development']