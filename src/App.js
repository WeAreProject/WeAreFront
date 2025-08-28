import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
const ProtectedRoute = ({ children }) => {
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
            return _jsx(Navigate, { to: "/", replace: true });
        }
        return _jsx(_Fragment, { children: children });
    }
    catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return _jsx(Navigate, { to: "/login", replace: true });
    }
};
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/negocio", element: _jsx(ProtectedRoute, { children: _jsx(Negocio, {}) }) }), _jsx(Route, { path: "/categories", element: _jsx(ProtectedRoute, { children: _jsx(Categories, {}) }) }), _jsx(Route, { path: "/categories/:categoryName", element: _jsx(ProtectedRoute, { children: _jsx(CategoryDetails, {}) }) }), _jsx(Route, { path: "/business/:businessId", element: _jsx(ProtectedRoute, { children: _jsx(BusinessDetails, {}) }) }), _jsx(Route, { path: "/mypurchases", element: _jsx(ProtectedRoute, { children: _jsx(Mypurchases, {}) }) }), _jsx(Route, { path: "/MyServices", element: _jsx(ProtectedRoute, { children: _jsx(MyServices, {}) }) }), _jsx(Route, { path: "/ServiceDashboard", element: _jsx(ProtectedRoute, { children: _jsx(ServiceDashboard, {}) }) }), _jsx(Route, { path: "/ModalRegister", element: _jsx(ProtectedRoute, { children: _jsx(ModalRegister, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(Profile, {}) }) }), _jsx(Route, { path: "/notification-settings", element: _jsx(ProtectedRoute, { children: _jsx(NotificationSettings, {}) }) }), _jsx(Route, { path: "/profile-settings", element: _jsx(ProtectedRoute, { children: _jsx(ProfileSettings, {}) }) }), _jsx(Route, { path: "/security-settings", element: _jsx(ProtectedRoute, { children: _jsx(SecuritySettings, {}) }) }), _jsx(Route, { path: "/support-settings", element: _jsx(ProtectedRoute, { children: _jsx(SupportSettings, {}) }) }), _jsx(Route, { path: "/payment-methods", element: _jsx(ProtectedRoute, { children: _jsx(PaymentMethods, {}) }) }), _jsx(Route, { path: "/refer", element: _jsx(ProtectedRoute, { children: _jsx(Refer, {}) }) }), _jsx(Route, { path: "/chat", element: _jsx(ProtectedRoute, { children: _jsx(ChatPage, {}) }) }), _jsx(Route, { path: "/fakeprofile", element: _jsx(FakeProfile, {}) }), _jsx(Route, { path: "/calendar", element: _jsx(CalendarPage, {}) }), _jsx(Route, { path: "/chatlist", element: _jsx(ChatList, {}) }), _jsx(Route, { path: "/notifications", element: _jsx(ProtectedRoute, { children: _jsx(NotificationsPage, {}) }) }), _jsx(Route, { path: "/anuncios", element: _jsx(Anuncios, {}) }), _jsx(Route, { path: "/promo", element: _jsx(Promo, {}) }), _jsx(Route, { path: "/p2w", element: _jsx(P2W, {}) }), _jsx(Route, { path: "/newchat/:chatId", element: _jsx(NewChat, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
}
export default App;
