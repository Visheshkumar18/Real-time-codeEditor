import express from 'express'
import  {Server } from "socket.io"
const app=express();
import http from "http"
const server=http.createServer(app);
const io=new Server(server);

io.on('connection',(socket)=>{

})


const Port=process.env.PORT || "3000";
server.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
})
