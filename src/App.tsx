import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ModalRegister from './components/modalRegister'; 
import Categories from './pages/categories';
import CategoryDetails from './pages/CategoryDetails';
import MyServices from './pages/MyServices';
import ServiceDashboard from './pages/ServiceDashboard';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/ModalRegister' element={<ModalRegister />} /> 
      <Route path='/categories' element={<Categories />} />
      <Route path='/category/:categoryName' element={<CategoryDetails />} />
      <Route path='/MyServices' element={<MyServices />}/>
      <Route path='/ServiceDashboard' element={<ServiceDashboard/>}/>
    </Routes>
  );
}

export default App;
