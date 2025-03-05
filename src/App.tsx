import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Categories from './pages/categories';
import ProfilePage from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import NotificationSettings from "./pages/NotificationSettings";
import SecuritySettings from "./pages/SecuritySettings";
import SupportSettings from "./pages/SupportSettings";
function App() {



  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
      <Route path="/settings/security" element={<SecuritySettings />} />
      <Route path="/settings/support" element={<SupportSettings />} />
    </Routes>
  );
}

export default App
