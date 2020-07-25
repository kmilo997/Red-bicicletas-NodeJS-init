var express = require('express');
var router = express.Router();
var bicicletasController = require('../controllers/bicicleta');

router.get('/',bicicletasController.bicicleta_list);
router.get('/create',bicicletasController.bicicleta_create);
router.get('/:id/update',bicicletasController.bicicleta_view_update);
router.post('/:id/update',bicicletasController.bicicleta_update);
router.post('/create',bicicletasController.bicicleta_post);
router.post('/:id/delete',bicicletasController.bicicleta_update);

module.exports = router;