import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Post";
import SignUp from "./userComponents/SignUp";
import Login from "./userComponents/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path="/post" element={ <Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
