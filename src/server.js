import express from 'express';
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dataSource from "./config/datasource";
import "reflect-metadata";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import alert from 'alert';

require('dotenv').config();

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config view engine
viewEngine(app);

//database connection
dataSource
    .initialize()
        .then(() => {
            console.log('Database connected!');
        });


io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        socket.on('message', message => {
            io.to(roomId).emit('createMessage', message);    
        })

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        })
    })
})


let port = process.env.PORT || 3300;

server.listen(port, ()=> {
    console.log(`App is running at ${port}`);
});

//init all web routes
initWebRoutes(app);