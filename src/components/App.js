import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Post";
import SignUp from "./authComponents/SignUp";
import Login from "./authComponents/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path="/timeline" element={ <Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
