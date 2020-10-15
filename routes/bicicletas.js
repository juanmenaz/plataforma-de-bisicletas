var express = require('express');
var router = express.Router();
var bicicletacontroller = require('../controllers/bicicleta');
router.get('/', bicicletacontroller.bicicleta_list);
router.get('/create', bicicletacontroller.bicicleta_create_get);
router.post('/create', bicicletacontroller.bicicleta_create_post);
router.get('/:id/update', bicicletacontroller.bicicleta_update_get);
router.post('/:id/update', bicicletacontroller.bicicleta_update_post);
router.post('/:id/delete', bicicletacontroller.bicicleta_delete_post);


module.exports = router;