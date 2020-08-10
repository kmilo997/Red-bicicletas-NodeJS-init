var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const mailer = require('../mailer/mailer');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;  

var Schema = mongoose.Schema;

const validateEmail = (email) =>{
    var regex_email =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex_email.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required:[true],
    },
    email: {
        type: String,
        trim: true,
        required:[true],
        lowercase: true,
        uniqu: true,
        validate:[validateEmail]
    },
    password: {
        type: String,
        required:[true],
    },
    passwordResetToken:String,
    passwordResetTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    }
})


usuarioSchema.plugin(mongooseUniqueValidator,{message: 'El {PATH} ya existe con otro usuario.'});


usuarioSchema.pre('save',(next)=>{
    if(this.isModified('password')){
        this.password = bcrypt.hasSync(this.password,saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = (password) =>{
    return bcrypt.compareSync(password,this.password); 
} 

usuarioSchema.methods.reservar = (biciId,desde,hasta,cb) =>{
    
    var reserva = new Reserva({
        usuario:this._id,
        bicicleta: biciId,
        desde:desde,
        hasta: hasta
    });

    reserva.save(cb);
}


usuarioSchema.methods.enviar_mail_bienvenida = (cb) =>{
    const token = new token({
        _userId:this.id,
        token: crypto.randomBytes(16).toString('hex')
    });

    const email = this.email;
    token.save((err)=>{
        if(err){
            return console.log(err);
        }

        const mailOptions = {
            from: 'no-reply@redbike.com',
            to:email,
            subject: 'Acc',
            text:'Hola, \n\n' + ' haga click en el link'
        }

        mailer.sendMail(mailOptions,(err)=>{
            if(err){
                return console.log(err);
            }

            console.log("sended");
        })
    })

}


module.exports = mongoose.model('Usuario',usuarioSchema);