import React, { useEffect, useState } from 'react'
import Client from '../components/Client'
import CodeEditor from '../components/CodeEditor'
import socket from '../socket'
import {useLocation, useNavigate, useParams} from "react-router-dom"
import toast from 'react-hot-toast'

const Editor = () => {
  const {roomId}=useParams();
  const location=useLocation();
  const{username}=location.state;
  const [clients,setClients]=useState([])
  const navigate=useNavigate();
  const HandleCopy=async()=>{
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('RoomId copied!')
    }catch(err){
      toast.error(err);
    }
  }
  const HandleLeave=async()=>{
    socket.disconnect();
    navigate('/');
    
  }
  useEffect(()=>{
   socket.emit('join-room',{roomId,username});
   socket.on('joined',({clients,socketId,newUser})=>{
    if(socketId!=socket.id){
      toast.success(`${newUser} is joined the room`)
    }
    setClients(clients);
  })
  
   return ()=>{
    socket.off('joined')
    socket.off('join-room')
   }
  },[])
  useEffect(()=>{
    socket.on('user-left',({clients,username})=>{
    setClients(clients);
    toast.success(`${username} leave the room`)
  })
  },[])
  return (
    <div className='flex bg-black w-screen h-screen'>
      {/* left */}
      <div className='w-2/12 h-screen flex flex-col justify-between border-r-2'>
      <div>
        <h1 className='text-xl text-white font-semibold'>Connected</h1>
        {/* showing client list  */}
        <div className='flex flex-wrap gap-4 m-4'>
          {
          clients.map((user)=>(<Client key={user.socketId} username={user.username}/>))
         }
        </div>
      </div>
      <div className='flex flex-col gap-1 p-4  '>
        <button onClick={HandleCopy} className="btn btn-primary  mt-4 text-center text-black font-bold">Copy RoomId</button>
         <button onClick={HandleLeave} className="btn btn-error  mt-4 text-center text-black font-bold">Leave</button>

      </div>

      </div>
      {/* right */}
      <div className='w-10/12 h-screen flex'>
         <CodeEditor roomId={roomId} socket={socket}/>
      </div>
      
    </div>
  )
}

export default Editor