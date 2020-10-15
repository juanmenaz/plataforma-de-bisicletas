var express = require('express');
var router = express.Router();
var bicicletacontroller = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletacontroller.bicicleta_list);
router.post('/create', bicicletacontroller.bicicleta_create);
router.delete('/delete', bicicletacontroller.bicicleta_delete);



module.exports = router;