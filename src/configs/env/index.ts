import development from "./development";
import staging from "./staging";
import test from "./test";
import production from "./production";

const { BOILER_NODE_ENV } = process.env;

export default {
    development,
    staging,
    test,
    production
}[BOILER_NODE_ENV || 'development']