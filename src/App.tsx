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
import ProfileSettings from './pages/ProfileSettings.tsx';
import SecuritySettings from './pages/SecuritySettings';
import SupportSettings from './pages/SupportSettings';
import CategoryDetails from './pages/CategoryDetails';
import BusinessDetails from './pages/BusinessDetails';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - token:', token);
  
  if (!user || !token) {
    console.log('Redirigiendo a login porque:', !user ? 'no hay usuario' : 'no hay token');
    // Limpiamos el localStorage si falta algún dato
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  try {
    // Verificamos que el user sea un JSON válido
    const userData = JSON.parse(user);
    // Verificamos que el usuario tenga el rol correcto para la ruta
    if (window.location.pathname === '/ModalRegister' && userData.role !== 'owner') {
      console.log('Redirigiendo a home porque el usuario no es owner');
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  } catch (error) {
    console.log('Error al parsear user:', error);
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
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/negocio" element={
        <ProtectedRoute>
          <Negocio />
        </ProtectedRoute>
      } />
      <Route path="/categories" element={
        <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      } />
      <Route path="/categories/:categoryName" element={
        <ProtectedRoute>
          <CategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/business/:businessId" element={
        <ProtectedRoute>
          <BusinessDetails />
        </ProtectedRoute>
      } />
      <Route path="/mypurchases" element={
        <ProtectedRoute>
          <Mypurchases />
        </ProtectedRoute>
      } />
      <Route path="/MyServices" element={
        <ProtectedRoute>
          <MyServices />
        </ProtectedRoute>
      } />
      <Route path="/ServiceDashboard" element={
        <ProtectedRoute>
          <ServiceDashboard />
        </ProtectedRoute>
      } />
      <Route path="/ModalRegister" element={
        <ProtectedRoute>
          <ModalRegister />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/notification-settings" element={
        <ProtectedRoute>
          <NotificationSettings />
        </ProtectedRoute>
      } />
      <Route path="/profile-settings" element={
        <ProtectedRoute>
          <ProfileSettings />
        </ProtectedRoute>
      } />
      <Route path="/security-settings" element={
        <ProtectedRoute>
          <SecuritySettings />
        </ProtectedRoute>
      } />
      <Route path="/support-settings" element={
        <ProtectedRoute>
          <SupportSettings />
        </ProtectedRoute>
      } />
      {/* Ruta por defecto - redirige al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
