const express = require('express')
const Libreria = require('./libs/libreria')
const { Router } = express;

const app = express()


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const router = Router()
const libreria = new Libreria(__dirname + "/data/libros.json")

const err1 = {error: "No se encontró el producto"}


router.get("/", (req, res) => {
    return res.json(libreria.list)
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    const existeObj = libreria.find(id)
    
    if(existeObj){
        return res.json(existeObj)
    } else {
        return res.status(404).json(err1)
    }
    
})

router.post("/", (req, res) => {
    const obj = req.body
    return res.json(libreria.insert(obj))
})

router.put("/:id", (req, res) => {
    const obj = req.body
    const id = req.params.id
    
    return res.json(libreria.update(id, obj))
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    const existeObj = libreria.delete(id)
    
    if(existeObj){
        return res.json(existeObj)
    } else {
        return res.status(404).json(err1)
    }
})


app.use("/api/productos", router)
app.use(express.static('./views'))

app.listen(3000)
