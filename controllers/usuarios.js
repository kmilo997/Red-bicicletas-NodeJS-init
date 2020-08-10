var Usuario = require('../models/usuario');

module.exports ={
    list(req,res,next){
        Usuario.find({},(err,usuarios)=>{
            res.render('usuarios/index',{usuarios:usuarios})
        })
    },
    update_get(req,res,next){
        Usuario.findById(req.params.id,(err,usuario)=>{
            res.render('usuarios/update',{usuario:usuario})
        })
    },
    update(req,res,next){
        var data = {
            nombre: req.body.nombre
        };

        Usuario.findByIdAndUpdate(res.params.id,(err,usuario)=>{
            if(err){
                console.log(err);
                res.render('usuarios/update',{
                    errors:err.errors,
                    usuario: new Usuario({
                        nombre: req.body.nombre,
                        email: req.body.email
                    })
                });
            }else{
                res.redirect('/usuarios');
                return;
            }
        })
        
    },

    create_get(req,res,next){
        Usuario.findById(req.params.id,(err,usuario)=>{
            res.render('usuarios/create',{
                usuario:new Usuario(),
                errors:{}
            })
        })
    },

    create(req,res,next){
        if(req.body.password != req.body.confirm_pwd){
            res.render('usuarios/create',{
                errors:{
                    confirm_pws:{
                        message: "La contraseñ no coincide",
                        usuario: new Usuario({
                            nombre: req.body.nombre,
                            email: req.body.email
                        })
                    }
                }
            })
            return
        }

        Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
        },(err)=>{
            if(err){
                console.log(err);
                res.render('usuarios/create',{
                    errors:err.errors,
                    usuario: new Usuario({
                        nombre: req.body.nombre,
                        email: req.body.email
                    })
                });
            }else{
                nuevoUsuario.enviar_mail_bienvenida();
                res.redirect('/usuarios');
            }
        })
        
    },

    delete(req,res,next){
        Usuario.findByIdAndDelete(req.body.id,(err)=>{
            if(err){
                next(err);
            }else{
                res.redirect('/usuarios');
            }
        })
    }

}