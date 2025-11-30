import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
const InputField = () => {
    const [roomId ,setRoomId]=useState('');
  const[username,setUserName]=useState('');
  const navigate=useNavigate();
    const createNewRoom=(e)=>{
        e.preventDefault();
        const id=uuidV4();
        setRoomId(id)
        toast.success('created a new room')
    }
    const joinRoom=()=>{
      console.log(roomId)
        if(!roomId||!username){
            toast.error('Enter the all field')
            return;
        }
        // redirect
        navigate(`/editor/${roomId}`,{state:{username}})

    }
    const HandleEnterKey=(e)=>{
        if(e.code=='Enter'){
            joinRoom();
        }
    }
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4 ">
  <legend className="fieldset-legend w-xs text-xl font-mono">Code Editor</legend>

  <label className="label">RoomId</label>
  <input type="text" 
  onChange={(e)=>setRoomId(e.target.value)} 
  value={roomId} 
  onKeyUp={HandleEnterKey}
  className="input input-success input-md font-bold text-white" 
  placeholder="RoomId" />

  <label className="label">User Name</label>
  <input type="text" 
  onChange={(e)=>setUserName(e.target.value)} 
  value={username} 
  onKeyUp={HandleEnterKey}
  className="input input-success input-md font-bold text-white" 
  placeholder="User Name" />

  <button className="btn btn-success w-xs mt-4 text-black font-bold" onClick={joinRoom}>Join</button>
  <span className='text-sm mt-3'> If you don't have an invite then create : <a  onClick={createNewRoom} className='text-green-400 font-semibold cursor-pointer'>New Room</a></span>
</fieldset>
  )
}

export default InputField