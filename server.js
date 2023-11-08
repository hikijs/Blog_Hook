require('dotenv').config();
const { initializeWebServer } = require('./src/app');
// Using Dependence Injection For DB and Rabbit Mq for easily testing
async function start() {
	console.time('>>> Start WebServer');
	await initializeWebServer();
	console.timeEnd('>>> Start WebServer');
}

start()
	.then(() => {
		console.log('The app has started successfully');
	})
	.catch((error) => {
		console.log('App occured during startup', error);
	});
