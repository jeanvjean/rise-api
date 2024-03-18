import env from "./env"
/* eslint-disable no-tabs */
/**
 * General app configuration
 * @category Configurations
 */
class App {
	public static appName = 'boiler'

	public static port = parseInt(`${env?.PORT}` || '3200')

	static clientBodyLimit = '50mb'
}

export default App;
