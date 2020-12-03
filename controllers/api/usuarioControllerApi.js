const Usuario = require("../../models/usuario")

exports.usuario_list=function (req,res) {
    Usuario.find({},function (err,r_usuarios) {
        res.status(200).json({
            usuarios:r_usuarios
        });
    });
};


exports.usuario_create = function (req,res) {
    var usuario = new Usuario({
        nombre:req.body.nombre,
        email:req.body.email,
        contraseña:req.body.contraseña
    })

    usuario.save(function(err){
        res.status(200).json({
            usuario:usuario,
            mensaje:"Usuario creado correctamente"
        })
    })
};

exports.usuario_reservar = function (req,res) {
    Usuario.findById(req.body.id,function (err,r_usuario) {
        console.log(r_usuario);
        r_usuario.reservar(req.body.bici_id,req.body.desde,req.body.hasta,function (err,reserva) {
            console.log("reserva!!");
            
            res.status(200).json({
                reserva:reserva,
                mensaje:"Creado correctamente"
            });
        })
    })
}

