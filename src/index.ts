import {config} from 'dotenv';
import Application from './app';
// Load environment variables
config();

// instantiate application
new Application();
