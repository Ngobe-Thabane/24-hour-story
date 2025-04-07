
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./NavBar";
import { Home } from "../pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}