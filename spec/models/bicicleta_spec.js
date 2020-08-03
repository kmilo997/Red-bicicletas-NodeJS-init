var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('testing bicicletas', () => {
    beforeEach(function (done) {
        var mongoDB = 'mongodb://localhost/red_bike';
        mongoose.connect(mongoDB,{useNewUrlParser:true});

        const db = mongoose.connection;
        db.on('err',console.error.blind(console,"Err on mongo: "));
        db.once('open',function () {
            console.log("conectado a la db");
            done();
        })
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({},function(err, res) {
            if(err) console.log(err);
            done();
        });
    });   
});


describe('Biciclet.create instae', () => {
    it('new instace', () => {
        var bicicleta =  Bicicleta.createInstance(1,"verde","2020",[-34.1,-54.1])
        expect(bicicleta.code).toBe(1);
    });

});

describe('bicicleta.add', () => {
    it('add just one bici', (done) => {
        var aBici = new Bicicleta({
            code: 1,
            color: "verde",
            modelo: "urbana"
        });

        Bicicleta.add(bici, function (err, newBici) {
            if(err) console.log(err);
            Bicicleta.allBicicletas(function (err, res) {
                expect(res.length).toEqual(1);
                done();
            })
        })
    });
});


describe('bicicleta.findyCode', () => {
    it('must return bici with code 1', (doce) => {
        Bicicleta.allBicicletas(function name(err,res) {
            expect(res.length).toBe(0);

            var aBici = new Bicicleta({
                code: 1,
                color: "verde",
                modelo: "urbana"
            });

            Bicicleta.add(aBici, function (err, newBici) {
                if(err) console.log(err);

                var aBici2 = new Bicicleta({
                    code: 2,
                    color: "gris",
                    modelo: "mtb"
                });
                Bicicleta.add(aBici2, function (err, newBici) {
                    if(err) console.log(err);

                    Bicicleta.findByCode(1, function (err, target) {
                        expect(target.code).toBe(aBici2.code);
                    })

                });
            })

        })
        

        
    });
});







/*
beforeEach(()=>{
    Bicicleta.allBicicletas = []
})

describe('Bicicleta.AllBicicletas', () => {
    it('Comienza vacio',()=>{
        expect(Bicicleta.allBicicletas.length).toBe(0);
    })
});

describe('Bicicleta.Add', () => {
    it('Agregamos una',()=>{
        expect(Bicicleta.allBicicletas.length).toBe(0);

        var b1 = new Bicicleta('1','blue','2019',[3.53795, -76.29900]);
        Bicicleta.add(b1);

        expect(Bicicleta.allBicicletas[0]).toBe(b1);
    })
});


describe('Bicicleta.FindByID', () => {
    it('Buscar una bici con id 1',()=>{
        expect(Bicicleta.allBicicletas.length).toBe(0);

        var b1 = new Bicicleta(1,'blue','2019');
        var b2 = new Bicicleta(2,'red','2019');
        Bicicleta.add(b1);
        Bicicleta.add(b2);

        var bici_found = Bicicleta.findByID(1);

        expect(bici_found.id).toBe(1);
        expect(bici_found.color).toBe(b1.color);
        expect(bici_found.modelo).toBe(b1.modelo);
    })
});
*/
