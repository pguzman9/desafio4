const fs = require("fs")

class Libreria {
    constructor(filename="libros.json") {
        this.id = 0
        this.list = []
        this.filename = filename

        this.init()
    }

    static error1 = {error: "Producto no encontrado"}

    init() {
        console.log(`Loading ${this.filename}`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)
        for (const obj of listaFromFile) {
            this.insert(obj)
        }
        console.log("File loaded.")
    }

    find(id) {
        try {return this.list.find((obj) => obj.id == id)}
        catch(e){
            
        }
    }

    static id = 0

    insert(obj) {
        obj.id = ++this.id
        this.list.push(obj)
        return obj
    }

    update(id, obj) {
        const index = this.list.findIndex((objT) => objT.id == id);
        obj.id = this.list[index].id
        this.list[index] = obj;

        return obj;
    }

    delete(id) {
        let objetoBorrar = this.list.find((obj) => obj.id == id)
        if (objetoBorrar) {
            console.log(objetoBorrar)
            this.list = this.list.filter(obj => obj.id != id);
        }

    }
}

module.exports = Libreria