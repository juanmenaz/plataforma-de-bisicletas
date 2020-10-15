var bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    res.status(200).json({
        bicicletas: bicicleta.allbicis
    });
}

exports.bicicleta_create = function(req, res){
    var bici = new bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.long];
    bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function(req, res){
    bicicleta.removeById(req.body.id);
    res.status(204).send();
}