var express = require('express');
const { route } = require('../../Mean/PROJECT/nodejs/controllers/user_controllers');
var router = express.Router();
var controller = require('../controllers/user_controller');




router.get('/', controller.main);
router.get('/add', controller.add);
// router.get('/:id', controller.id);
router.post('/add', controller.postAdd);
router.get('/edit/:id', controller.edit);
router.post('/delete', controller.delete);
router.post('/edit', controller.editPost);
router.get('/login', controller.login);
router.post('/login', controller.loginPost);

module.exports = router;