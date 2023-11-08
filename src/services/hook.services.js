const { postApi } = require('../helpers/callApi');
const { spawn } = require('child_process');
class HookService {
	static handleDockerHook = async (req) => {
		return new Promise((resolve, rejects) => {
			// console.log(req.body);
			const callbackUrl = req.body.callback_url;
			const headers = {
				'Content-type': 'application/json',
				Accept: 'text/plain',
			};
			const data = { state: 'success' };
			postApi(callbackUrl, data, headers)
				.then((callbackresult) => {
					const command =
						'/Users/hunghoang/project/opensouce/blog/blog_backend_fork/deployment/stop.sh -p Chobicon1#';

					const childProcess = spawn('sh', ['-c', command]);

					childProcess.stderr.on('data', (data) => {
						console.error(`\r${data}`);
					});

					childProcess.on('close', (code) => {
						console.log(`child process exited with code ${code}`);
					});
					// Resolve the Promise when the child process has completed
					childProcess.on('close', (code) => {
						let result = 'Success';
						if (code != 0) {
							result = 'Failed';
						}
						resolve({
							triggerResult: result,
							callbackresult,
							resBody: req.body,
						});
					});
				})
				.catch((err) => {
					rejects(err);
				});
		});
	};
}

module.exports = HookService;
