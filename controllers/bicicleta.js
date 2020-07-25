var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = (req,res) =>{
    res.render('bicicletas/index',{bicis: Bicicleta.allBicicletas});
}

exports.bicicleta_create = (req,res) =>{
    res.render('bicicletas/create');
}

exports.bicicleta_post = (req,res) =>{
    let id = req.body.id;
    let color = req.body.color;
    let modelo = req.body.modelo;
    let ubicacion = [req.body.lat,req.body.log];

    let bici = new Bicicleta(id,color,modelo,ubicacion);
    Bicicleta.add(bici);
    res.redirect('/bicicletas');
}

exports.bicicleta_view_update = (req,res) =>{
    var bici = Bicicleta.findByID(req.params.id);
    res.render('bicicletas/update',{bici});
}

exports.bicicleta_update = (req,res) =>{
    let id = req.body.id;
    let color = req.body.color;
    let modelo = req.body.modelo;
    let ubicacion = [req.body.lat,req.body.log];


    var bici = Bicicleta.allBicicletas.find(x => x.id === id);
    var index = Bicicleta.allBicicletas.indexOf(bici);

    Bicicleta.allBicicletas[index].color = color;
    Bicicleta.allBicicletas[index].modelo = modelo;
    Bicicleta.allBicicletas[index].ubicacion = ubicacion;

    res.redirect('/bicicletas');
}


exports.bicicleta_delete = (req,res) =>{
    Bicicleta.removeByID(req.body.id);
    res.redirect('/bicicletas');
}