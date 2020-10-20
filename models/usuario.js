var mongoose = require('mongoose');
var reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function(biciid, desde, hasta, cb){
    var reserva = new reserva({usuario: this._id, bicicleta: biciid, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = mongoose.model('usuario', usuarioSchema);