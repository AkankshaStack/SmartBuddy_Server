const router = require('express').Router();
const gameController = require('../controllers/game.controller');

router.route('/data')
.get(gameController.getGame)
.post(gameController.postGame);

router.get('/data/:id', gameController.getGameById);

module.exports = router;