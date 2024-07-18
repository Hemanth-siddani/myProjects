const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors : {
        origin : 'http://localhost:5173',
        methods : ['GET','POST']
    }
})

io.on('connection',(socket) => {
    console.log('Socket id',socket.id)

    socket.on('join_room',(data) => {
        console.log('join_room : ',data)
        socket.join(data)
    })

    socket.on('chat-details',(data) => {
        console.log('chat-details',data)
        socket.to(data.room_code).emit('broadcasting_data',data)
    }) 


    socket.on('disconnect',() => {
        console.log('User disconnected.')
    })
})

const port = process.env.PORT || 8080

app.get('/',(req,res) => {
    let serverMessage = 'Server activated at port ' + port
    res.send(serverMessage)
})

server.listen(port,() => {
    console.log('Server active at port',port)
})


