import React, { useState } from 'react'
import Client from '../components/Client'
import CodeEditor from '../components/CodeEditor'

const Editor = () => {
  const [clients,setClients]=useState([{socketId:1,username:"vishesh"},{socketId:2,username:"Rohit"}])
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
        <button className="btn btn-primary  mt-4 text-center text-black font-bold">Copy RoomId</button>
         <button className="btn btn-error  mt-4 text-center text-black font-bold">Leave</button>

      </div>

      </div>
      {/* right */}
      <div className='w-10/12 h-screen flex'>
         <CodeEditor/>
      </div>
      
    </div>
  )
}

export default Editor