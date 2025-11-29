import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Editor from './Pages/Editor'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/editor/:id' element={<Editor/>}></Route>
    </Routes>
    
    
    </>
  )
}

export default App