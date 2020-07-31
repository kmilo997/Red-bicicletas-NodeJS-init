function Bicicleta(id,color,modelo,ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function test() {
    return 'id' + this.id + ' | color '+ this.color + this.modelo + this.ubicacion;
}

Bicicleta.allBicicletas = [];
Bicicleta.add = (bicicleta) =>{
    Bicicleta.allBicicletas.push(bicicleta);
}

Bicicleta.findByID = (id) =>{
    var b = Bicicleta.allBicicletas.find(e => e.id == id);
   
    if(b){
        return b;
    }else{
        throw new Error('Bicicleta no found');
    }
}

Bicicleta.removeByID = (id) =>{
    Bicicleta.allBicicletas.forEach(e => {
        if(e.id == id){
            Bicicleta.allBicicletas.splice(e,1);
            return true;
        }
    });
}

/*var b1 = new Bicicleta('1','blue','2019',[3.53795, -76.29900]);
var b2 = new Bicicleta('2','red','2017',[3.53795, -76.29714]);

Bicicleta.add(b1);
Bicicleta.add(b2);*/


module.exports = Bicicleta;