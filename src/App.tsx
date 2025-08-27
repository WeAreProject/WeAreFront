import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/categories';
import Mypurchases from './pages/Mypurchases';
import MyServices from './pages/MyServices';
import ServiceDashboard from './pages/ServiceDashboard';
import ModalRegister from './components/modalRegister';
import Negocio from './pages/Negocio';
import Profile from './pages/Profile';
import NotificationSettings from './pages/NotificationSettings';
import ProfileSettings from './pages/ProfileSettings';
import SecuritySettings from './pages/SecuritySettings';
import SupportSettings from './pages/SupportSettings';
import CategoryDetails from './pages/CategoryDetails';
import BusinessDetails from './pages/BusinessDetails';
import PaymentMethods from './pages/PaymentMethods';
import Refer from './pages/Refer';
import ChatPage from './pages/chatpages';
import FakeProfile from "./pages/fakeprofile";
import CalendarPage from './pages/calendar';
import ChatList from "./pages/chatlist";
import NotificationsPage from './pages/Notifications';
import Anuncios from "./pages/anuncios";
import Promo from "./pages/promo";
import P2W from "./pages/p2w";
import NewChat from "./pages/newchat";






// 🔹 ProtectedRoute ajustado para pruebas locales
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  // 🔹 Si no hay user ni token, creamos fake local
  if (!user || !token) {
    const fakeUser = { id: "1", name: "Usuario Demo", email: "demo@weare.com" };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "faketoken123");
    user = JSON.stringify(fakeUser);
    token = "faketoken123";
  }

  try {
    const userData = JSON.parse(user);
    if (window.location.pathname === '/ModalRegister' && userData.role !== 'owner') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/negocio" element={<ProtectedRoute><Negocio /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="/categories/:categoryName" element={<ProtectedRoute><CategoryDetails /></ProtectedRoute>} />
      <Route path="/business/:businessId" element={<ProtectedRoute><BusinessDetails /></ProtectedRoute>} />
      <Route path="/mypurchases" element={<ProtectedRoute><Mypurchases /></ProtectedRoute>} />
      <Route path="/MyServices" element={<ProtectedRoute><MyServices /></ProtectedRoute>} />
      <Route path="/ServiceDashboard" element={<ProtectedRoute><ServiceDashboard /></ProtectedRoute>} />
      <Route path="/ModalRegister" element={<ProtectedRoute><ModalRegister /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/notification-settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
      <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
      <Route path="/security-settings" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />
      <Route path="/support-settings" element={<ProtectedRoute><SupportSettings /></ProtectedRoute>} />
      <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
      <Route path="/refer" element={<ProtectedRoute><Refer /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/fakeprofile" element={<FakeProfile />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/chatlist" element={<ChatList />} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/anuncios" element={<Anuncios />} />
      <Route path="/promo" element={<Promo />} />
      <Route path="/p2w" element={<P2W />} />
      <Route path="/newchat/:chatId" element={<NewChat />} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
