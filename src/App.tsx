import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/categories';
import Mypurchases from './pages/Mypurchases';
import MyServices from './pages/MyServices';
import ServiceDashboard from './pages/ServiceDashboard';
import ModalRegister from './components/modalRegister';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
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
      <Route path="/categories" element={
        <ProtectedRoute>
          <Categories />
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

      {/* Ruta por defecto - redirige al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
