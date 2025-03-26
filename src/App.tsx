import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ModalRegister from './components/modalRegister'; 
import Categories from './pages/categories';
import CategoryDetails from './pages/CategoryDetails';
import MyServices from './pages/MyServices';
import Negocio from './pages/Negocio';
import ProfilePage from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import NotificationSettings from "./pages/NotificationSettings";
import SecuritySettings from "./pages/SecuritySettings";
import SupportSettings from "./pages/SupportSettings";

function App() {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/ModalRegister' element={<ModalRegister />} /> 
      <Route path='/categories' element={<Categories />} />
      <Route path="/Negocio" element={<Negocio />} />
      <Route path='/categories' element={<Categories/>}/>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
      <Route path="/settings/security" element={<SecuritySettings />} />
      <Route path="/settings/support" element={<SupportSettings />} />
      <Route path='/category/:categoryName' element={<CategoryDetails />} />
      <Route path='/MyServices' element={<MyServices />}/>
    </Routes>
  );
}

export default App;
