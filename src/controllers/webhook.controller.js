'use strict';
const { OK } = require('../core/response/apiSuccessResponse');

const HookService = require('../services/hook.services');
class HookController {
	// eslint-disable-next-line no-unused-vars
	dockerWebHook = async (req, res, next) => {
		new OK({
			message: 'Docker Hooked Success!',
			metaData: await HookService.handleDockerHook(req),
		}).send(res);
	};
}

module.exports = new HookController();
