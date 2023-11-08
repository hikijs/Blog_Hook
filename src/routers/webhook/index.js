'use strict';

const express = require('express');
const router = express.Router();
const { asyncHanlder } = require('../../helpers/asyncHandler');
const HookController = require('../../controllers/webhook.controller');

require('dotenv').config();
// logout api
router.post('/hooking', asyncHanlder(HookController.dockerWebHook));

module.exports = router;
