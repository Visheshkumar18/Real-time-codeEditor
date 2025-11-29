import React from 'react'
import Avatar from "react-avatar";
const Client = (props) => {
  return (
   
   <div className='flex flex-col items-center'>
    
        <Avatar name={props.username} size={50} round="14px"/>
    <span>{props.username}</span>
     </div>
    
  )
}

export default Client