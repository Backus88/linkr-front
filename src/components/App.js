import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Post";
import SignUp from "./authComponents/SignUp";
import Login from "./authComponents/Login";
import UserContext from "../contexts/UserContext"
import PostById from "./PostById";


function App() {

  const [info, setInfo] = useState({}); // SALVA O NOME DE USUARIO E TOKEN QUE VEM DO BACK
  const [local, setLocal] = useState({}); // SALVA O TOKEN QUE VEM DO LOCAL STORAGE
  const [modal, setModal] = useState(false)
  const [postController, setPostController] = useState(false);
  const contextValue = {info, setInfo, local, setLocal, modal, setModal, postController, setPostController }


  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Login />} />
          <Route path="/timeline" element={ <Post />} />
          <Route path='/user/:id' element ={ <Post /> } />
          <Route path='/hashtag/:hashtag' element={<Post />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
