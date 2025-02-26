import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Categories from './pages/categories';
function App() {



  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/categories' element={<Categories/>}/>

    </Routes>
  );
}

export default App
