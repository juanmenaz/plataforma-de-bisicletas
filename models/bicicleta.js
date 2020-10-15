var bicicleta = function (id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

bicicleta.prototype.toString = function (){
    return 'id: ' + this.id + " | color:" + this.color;
}

bicicleta.allbicis = [];
bicicleta.add = function(abici){
    bicicleta.allbicis.push(abici);
}

bicicleta.findById = function(abiciid){
    var abici = bicicleta.allbicis.find(x => x.id == abiciid);
    if (abici)
        return abici;
    else
        throw new Error(`No existe una bicicleta con el id ${abiciid}`)
}

bicicleta.removeById = function(abiciid){
    console.log(abiciid);
    for(var i = 0; i < bicicleta.allbicis.length; i++){
        if (bicicleta.allbicis[i].id == abiciid){
            bicicleta.allbicis.splice(i, 1);
            break;
        }
    }
}
 
var a = new bicicleta(1, 'rojo', 'urbana', [-34.608114,-58.370298]);
var b = new bicicleta(2, 'verde', 'urbana', [-34.604032,-58.369546]);

bicicleta.add(a);
bicicleta.add(b);

module.exports = bicicleta;
