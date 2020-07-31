var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET Bicileta', () => {
        it('status 200',()=>{
            expect(Bicicleta.allBicicletas.length).toBe(0);

            var b1 = new Bicicleta('1','blue','2019',[3.53795, -76.29900]);
            Bicicleta.add(b1);

            request.get('http://127.0.0.1:3000/api/bicicletas',(req,res)=>{
                expect(res.statusCode).toBe(200);
            })
        })
    });
});

describe('Bicicleta API', () => {
    it('status 200',(done)=>{
        var headers = {
            'content-type' : 'application/json'
        };

        var bici = '{"id" :"10","color":"red","modelo": "downhill","lat": "54","log": "-96"}'

        request.post({
            headers: headers,
            url: 'http://127.0.0.1:3000/api/bicicletas/create',
            body: bici
        },  function (error, res, body){
            expect(res.statusCode).toBe(200);
            expect(Bicicleta.findByID(10).color).toBe("red");
            done();
        })
    })
});