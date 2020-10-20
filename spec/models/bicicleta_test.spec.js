var mongoose = require('mongoose');
var bicicleta = require('../../models/bicicleta');

describe('testing bicicleta', function(){
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
           if (success) console.log('******Eliminó todo******');
           done();
       });
    });

    describe('bicicleta.createInstance', () => {
        it('crea una instancia de bicicleta', () => {
            var bici = bicicleta.createInstance(1, "verde", "montaña", [-34, -54]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("montaña");
            expect(bici.ubicacion[0]).toEqual(-34);
            expect(bici.ubicacion[1]).toEqual(-54);
            console.log('******Crea instancia******');
            console.log(bici);
        });
    });

    describe('bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('bicicleta.add', () => {
        it('agregamos una', () => {
            expect(bicicleta.allbicis.length).toBe(0);
            var a = new bicicleta(1, 'rojo', 'urbana', [-34.608114,-58.370298]);
            bicicleta.add(a);
            expect(bicicleta.allbicis.length).toBe(1);
            expect(bicicleta.allbicis[0]).toBe(a);
            });
    });

    describe('bicicleta.findById', () => {
        it('debe devolver bici id 1', () => {
            expect(bicicleta.allbicis.length).toBe(0);
            var abici = new bicicleta(1, 'rojo', 'urbana');
            var abici2 = new bicicleta(2, 'verde', 'playera');
            bicicleta.add(abici);
            bicicleta.add(abici2);
            var tarjetbici = bicicleta.findById(1);
            expect(tarjetbici.id).toBe(1);
            expect(tarjetbici.color).toBe(abici.color);
            expect(tarjetbici.modelo).toBe(abici.modelo);
            });
    });
    
    describe('bicicleta.removeById', () => {
        it('debe quedar en 1', () => {
            expect(bicicleta.allbicis.length).toBe(0);
            var abici = new bicicleta(1, 'rojo', 'urbana');
            var abici2 = new bicicleta(2, 'verde', 'playera');
            bicicleta.add(abici);
            bicicleta.add(abici2);
            var tarjetbici = bicicleta.findById(1);
            bicicleta.allbicis.splice(tarjetbici.id, 1);
            expect(bicicleta.allbicis.length).toBe(1);
            });
    });

    describe('bicicleta.findByCode', () => {
        it('debe devolver bici code 1', (done) => {
            bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var abici = new bicicleta({code: 1, color: "verde", modelo: "montaña"});
                bicicleta.add(abici, function (err, newbici) {
                    if (err) console.log(err);

                    var abici2 = new bicicleta({code: 2, color: "azul", modelo: "urbana"});
                    bicicleta.add(abici2, function (err, newbici) {
                        if (err) console.log(err);
                        bicicleta.findByCode(1, function (err, targetBici){
                            expect(targetBici.code).toBe(abici.code);
                            expect(targetBici.color).toBe(abici.color);
                            expect(targetBici.modelo).toBe(abici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });




    
});