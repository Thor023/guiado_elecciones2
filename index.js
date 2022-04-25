//Levantar Servidor en puerto 3000 con Express
const express = require('express');
const app = express();
const port = 3000;
app.listen(port,  ()=>{
    console.log(`El servidor esta en el puerto ${port}`);
});
app.use(express.json());
const {guardarCandidato, getCandidatos, editCandidato, eliminarCandidato, registrarVotos, getHistorial} = require('./consultas')
//ruta base al html 
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
});
// Ruta guardar candiato
app.post("/candidato", async (req, res ) => {
    try {
        const candidato = req.body
        const result = await guardarCandidato(candidato);
        res.status(201).json(result)
        console.log(req.body)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.get("/candidatos", async (req, res) => {
    try {
        const candidatos = await getCandidatos();
        res.json(candidatos)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.put("/candidato", async (req,res)=>{
    try {
        const candidato = req.body
        const result = await editCandidato(candidato)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.delete("/candidato", async (req, res) => {
    try {
        const {id} = req.query
        await eliminarCandidato(id)
        res.send("Candidato eliminado con éxito")
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post("/votos", async(req,res)=>{
    try {
        const voto= req.body
        const result = await registrarVotos(voto)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.get("/historial", async (req,res )=>{
    try {
        const historial = await getHistorial()
        res.json(historial)
    } catch (error) {
        res.status(500).send(error)
    }
})

