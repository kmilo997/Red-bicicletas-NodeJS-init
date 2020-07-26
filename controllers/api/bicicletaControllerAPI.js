var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req,res)=>{
    res.status(200).json({
        bicicletas: Bicicleta.allBicicletas
    });
}


exports.bicicleta_create = (req,res) =>{
    let id = req.body.id;
    let color = req.body.color;
    let modelo = req.body.modelo;
    let ubicacion = [req.body.lat,req.body.log];

    let bici = new Bicicleta(id,color,modelo,ubicacion);
    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta:bici
    })
}


exports.bicicleta_delete = (req,res) =>{
    let id = req.body.id;
    Bicicleta.removeByID(id);

    res.status(204).json({
        msg:"success"
    })
}