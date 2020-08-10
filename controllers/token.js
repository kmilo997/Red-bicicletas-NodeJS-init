var Usuario = require('../models/usuario');
var Token  = require('../models/token');

module.exports = {
    confirmationGet(req,res,err){
        Token.findOne({
            token: req.params.token
        },(err,token)=>{
            if(!token){
                return res.status(400).send({
                    type: 'not-verified',
                    msg:'Failed token'
                })
            }

            Usuario.findById(token._userId,(err,usuario)=>{
                if(!usuario) {
                    return res.status(400).send({
                        msg:'User not founded'
                    })
                }

                if(usuario.verificado){
                    res.redirect('/usuarios')
                }

                usuario.verificado = true;
                usuario.save(err=>{
                    if(err){
                        return res.status(500).send({
                            msg: err.message
                        });
                    }
                    res.redirect('/');
                })
            })
        })
    }
}