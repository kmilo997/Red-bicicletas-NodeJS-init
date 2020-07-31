var Bicicleta = require('../../models/bicicleta');

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

