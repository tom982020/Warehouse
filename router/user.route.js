var express = require('express');
const { route } = require('../../Mean/PROJECT/nodejs/controllers/user_controllers');
var router = express.Router();
var controller = require('../controllers/user_controller');




router.get('/', controller.main);
// router.get('/search', controller.search);
router.get('/add', controller.add);
// router.get('/:id', controller.id);
router.post('/add', controller.postAdd);
// router.get('/edit', controller.edit);
// route.post('/delete', controller.delete);

module.exports = router;