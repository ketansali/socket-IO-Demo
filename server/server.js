const path = require('path')
const express = require('express')
const app = express()
const publicpath = path.join(__dirname+'../../public')
const http = require('http')
const socketIO = require('socket.io')
const {generateMessage,generateLocationMessage} = require('./utils/message')
const server  = http.createServer(app)
const PORT = process.env.PORT || 7600
app.use(express.static(publicpath))

let io = socketIO(server)

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.emit('newmsg',{
        from : "surat",
        text : "hi kese ho"
    })
    socket.broadcast.emit('newmsg',{
        from : "surat",
        text : "new user Join"
    })
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    })
    socket.on('createMessage',(message)=>{
        io.emit('newmsg',generateMessage(message.from,message.text))
    })
    // socket.emit('newmsg',{
    //     from: "ketan",
    //     text : "sali"
    // })
    socket.on('createLocationMsg',(coords)=>{
        console.log(coords);
        io.emit('newLocationmsg',generateLocationMessage('Admin',coords.lat, coords.log))
    })
})

server.listen(PORT,()=>{
    console.log(`Server is Running On PORT ${PORT}`);
})



