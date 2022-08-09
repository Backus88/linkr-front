import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./Post";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/post" element={ <Post />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
