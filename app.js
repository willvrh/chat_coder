//Imports
const express = require('express')
const {Server} = require('socket.io')

//Initialization
const app = express()
const port = process.env.PORT||8080

//Config
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Server
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

server.on('error', error => console.log(`Error en el servidor: ${error}`))

app.use(express.static(__dirname+'/public'))

const io = new Server(server)

let messages = []

io.on('connection', socket => {
    console.log("Cliente conectado")
    const msg = "Bienvenido"
    socket.emit('welcome', msg)
    socket.emit('messagelog', messages)
    socket.on('message', data => {
        messages.push({id:socket.id, ...data})
        io.emit('messagelog', messages)
    })
})