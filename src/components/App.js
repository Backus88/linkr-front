import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Post";
import SignUp from "./authComponents/SignUp";
import Login from "./authComponents/Login";
import UserContext from "../contexts/UserContext"


function App() {

  const [info, setInfo] = useState({}); // SALVA O NOME DE USUARIO E TOKEN QUE VEM DO BACK
  const [local, setLocal] = useState({}); // SALVA O TOKEN QUE VEM DO LOCAL STORAGE
  const contextValue = {info, setInfo, local, setLocal }

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Login />} />
          <Route path="/timeline" element={ <Post />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
