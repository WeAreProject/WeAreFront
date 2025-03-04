import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessForm from './pages/BusinessForm';
import BusinessContact from './pages/BusinessContact';
import BusinessDetails from './pages/BusinessDetails';
import BusinessVerification from './pages/BusinessVerification'; // Importa el nuevo componente

function App() {
  const navigate = useNavigate();

  // Funciones de navegación
  const nextStepContact = () => {
    navigate('/BusinessContact');
  };

  const nextStepDetails = () => {
    navigate('/BusinessDetails');
  };

  const nextStepVerification = () => {
    navigate('/BusinessVerification');
  };

  const nextStepHome = () => {
    navigate('/'); // Redirige a la página de inicio (Home)
  };

  const prevStepContact = () => {
    navigate('/BusinessForm');
  };

  const prevStepDetails = () => {
    navigate('/BusinessContact');
  };

  const prevStepVerification = () => {
    navigate('/BusinessDetails');
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/BusinessForm' element={<BusinessForm nextStep={nextStepContact} />} />
      <Route path='/BusinessContact' element={<BusinessContact prevStep={prevStepContact} nextStep={nextStepDetails} />} />
      <Route path='/BusinessDetails' element={<BusinessDetails prevStep={prevStepDetails} nextStep={nextStepVerification} />} />
      <Route path='/BusinessVerification' element={<BusinessVerification prevStep={prevStepVerification} nextStep={nextStepHome} />} />
    </Routes>
  );
}

export default App;
