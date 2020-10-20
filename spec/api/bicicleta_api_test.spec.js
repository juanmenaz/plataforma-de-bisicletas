var bicicleta = require('../../models/bicicleta');
var request = require('request');
var mongoose = require('mongoose');
var server = require('../../bin/www');
var base_url = "http://localhost:5000/api/bicicletas"

describe('bicicleta api', () => {
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

    describe('get bicicletas /', () => {
        it('status 200', () => {
            request.get(base_url, function(error, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('post bicicletas /create', () => {
        it('status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var abici = '{"id":10, "color": "rojo", "modelo": "urbana", "lat": -34, "long": -54}';
            
            request.post({
                headers:    headers,
                url:        base_url + "/create",
                body:       abici
                }, function(error, response, body){
                    expect(response.statusCode).toBe(200);
                    var bici = JSON.parse(body).bicicleta;
                    console.log(bici);
                    expect(bici.color).toBe("rojo");
                    expect(bici.ubicacion[0]).toBe(-34);
                    expect(bici.ubicacion[1]).toBe(-54);
                    done();
                });
        });
    });

    describe('post bicicletas /remove', () => {
        it('status 204', (done) => {
            var headers = {'content-type' : 'application/json'};
            var abici = '{"id":10}';
            
            request.delete({
                headers:    headers,
                url:        base_url + "/delete",
                body:       abici
                }, function(error, response, body){
                    expect(response.statusCode).toBe(204);
                    bicicleta.allbicis.splice(abici.id, 1);
                    expect(bicicleta.allbicis.length).toBe(0);
                    done();
                });
        });
    });
});





