const router = require('express').Router();
const gameplayController = require('../controllers/gameplay.controller')

router.route('/data')
.get(gameplayController.getData)
.post(gameplayController.postData);

module.exports = router;