var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');



describe(' testing bicicletas', function(){
    beforeEach(function(done){
        var mongoDB = 'mongoDB://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('we are connected to test database');
            DelayNode();
        });
    });
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });
});

describe('Bicicleta.createInstance', () =>{
    it('crea una instancia  de Bicicleta', () => {
        var bici = Bicicleta.createInstance(1, "verde", "urbana",[-34.5, -54.1]);

        expect(bici.code).toBe(1);
        expect(bici.color).toBe("verde");
        expect(bici.modelo).toBe("urbana");
        expect(bici.ubicacion[0]).toEqual(-34.5);
        expect(bici.ubicacion[1]).toEqual(-54.1);
    });
});

describe('Bicicleta.allBicis', () => {
    it('inicia vacia', (done) =>{
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);
            DelayNode();
        });
    });
});

describe('Bicicleta.add', () => {
    it('agrega solo una bici', (done) => {
      var aBici = new Bicicleta({code: 1, color:"verde", modelo:"urbana"});
      Bicicleta.add(aBici, function(err, newBici){
        if ( err ) console.log(err);
        Bicicleta.allBicis(function(err, bicis){
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);
          done(); 
        });
      });
    });    
  });

  describe('Bicicleta.findByCode', () => {
    it('debe de devolver la bici con code 1', (done) => {
      Bicicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0);
        var aBici = new Bicicleta({code: 1, color: "verde", modelo:"urbana"});
         Bicicleta.add(aBici, function(err, newBici){
          if (err) console.log(err);
          
          var aBici2 = new Bicicleta({code:2, color: "roja", modelo:"deportiva"});
          Bicicleta.add(aBici2, function(err, newBici){
            if (err) console.log(err);
            Bicicleta.findByCode(1, function(error, targetBici){
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);
              done();
            });
          });
        });
      });
      
    });    
  });

/*
beforeEach(() => {Bicicleta.allBicis = [];});
describe('Bicicleta.allBicis', () =>{
    it('inicia vacia', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () =>{
    it('Agregar Bicicleta', () =>{
     expect(bicicleta.allBicis.length).toBe(0);
     var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        Bicicleta.add(a);
        expect(bicicleta.allBicis.length).toBe(1);
        expect(bicicleta.allBicis[0]).toBe(a);

    });
});

describe('Bicicleta.finById', () => {
    it('debe retornar una bicicleta con id 1', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana');
        var a = new Bicicleta(2, 'azul', 'montaña');
        Bicicleta.add(1);
        Bicicleta.add(2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});*/