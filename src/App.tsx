import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ModalRegister from './components/modalRegister'; // Importa el componente ModalRegister
import Categories from './pages/categories';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/ModalRegister' element={<ModalRegister />} /> {/* Ruta para ModalRegister */}
      <Route path='/categories' element={<Categories />} />
    </Routes>
  );
}

export default App;
