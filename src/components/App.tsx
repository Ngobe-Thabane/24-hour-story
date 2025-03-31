import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home';
import '../styles/App.css';
import Create from '../pages/Create';
import NavBar from './NavBar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route element={<Home/>} path='/'/>
          <Route path='/create' element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
