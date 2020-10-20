var bicicleta = require('../../models/bicicleta');
var usuario = require('../../models/usuario');
var reserva = require('../../models/reserva');
var mongoose = require('mongoose');

describe ('testing usuarios', function(){
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {
            useUnifiedTopology: true,
            useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error: '));
        db.once('open', function() {
           console.log('******Se conecto a la db test******');
           done();
        });
    });

    afterEach(function(done) {
        bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            reserva.deleteMany({}, function(err, success){
                if (err) console.log(err);
                usuario.deleteMany({}, function(err, success){
                    if (err) console.log(err);
            done();
        });
     });

     describe('cuando un usuario reserva una bici', () => {
         it ('debe existir la reserva', (done) => {
             const usuario = new usuario({ nombre: 'Alejandro'});
             usuario.save();
             const bicicleta = new bicicleta({ code: 1, color: "verde", modelo: "urbana"});
             bicicleta.save();

             var hoy = new Date();
             var mañana = new Date();
             mañana.setDate(hoy.getDate()+1);
             usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
                 reserva.find({}).populate('bicicleta').populate('usuaroi').exec(function(err, reserva){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasdereserva).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                 });
             });
         });
     });

});