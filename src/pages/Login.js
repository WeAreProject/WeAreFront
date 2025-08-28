import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../index.css";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(null);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;
    // Datos simulados de usuarios para login
    const mockUsers = [
        {
            id: "1",
            email: "juan.perez@example.com",
            password: "password123",
            name: "Juan Pérez",
            phone: "+1 234 567 8900",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "2",
            email: "maria.garcia@example.com",
            password: "password123",
            name: "María García",
            phone: "+1 234 567 8901",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "3",
            email: "carlos.lopez@example.com",
            password: "password123",
            name: "Carlos López",
            phone: "+1 234 567 8902",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        }
    ];
    // simulador de login sin API
    const mockLogin = async ({ email, password }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Buscar usuario en los datos simulados
                const user = mockUsers.find(u => u.email === email && u.password === password);
                if (user) {
                    resolve({ success: true, user, message: "Login successful" });
                }
                else {
                    resolve({ success: false, message: "Credenciales inválidas" });
                }
            }, 1000);
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        setLoginError("");
        if (!validateEmail(email)) {
            setEmailError("Formato de email inválido");
            valid = false;
        }
        else {
            setEmailError("");
        }
        if (!validatePassword(password)) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            valid = false;
        }
        else {
            setPasswordError("");
        }
        if (valid) {
            setIsLoading(true);
            try {
                const response = await mockLogin({ email, password });
                if (response.success && response.user) {
                    // Guardar todos los datos del usuario en localStorage
                    localStorage.setItem("user", JSON.stringify(response.user));
                    navigate("/"); // Redirigir al home
                }
                else {
                    setLoginError(response.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
                }
            }
            catch (error) {
                setLoginError(error.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
            }
            finally {
                setIsLoading(false);
            }
        }
    };
    // simulador login social
    const handleSocialLogin = (provider) => {
        setSocialLoading(provider);
        setTimeout(() => {
            // Crear un usuario simulado basado en el proveedor
            const mockUser = {
                id: provider === "google" ? "1" : provider === "facebook" ? "2" : "3",
                name: `Usuario ${provider}`,
                email: `${provider}@example.com`,
                phone: "+1 234 567 8900",
                image: `images/category-icons/${provider}.png`,
                provider,
                token: `mock-${provider}-token`
            };
            localStorage.setItem("user", JSON.stringify(mockUser));
            navigate("/");
        }, 1000);
    };
    return (_jsxs("div", { className: "relative min-h-screen w-full flex items-center justify-center px-4 py-6 overflow-hidden", children: [_jsx("img", { src: "images/category-icons/1.2.jpg", alt: "Fondo", className: "absolute inset-0 w-full h-full object-cover -z-10" }), _jsxs("div", { className: "w-full max-w-sm", children: [_jsx("div", { className: "flex justify-center mb-10", children: _jsx("img", { src: "images/category-icons/WRE.png", alt: "WER Logo", className: "h-60" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white", children: "Correo Electr\u00F3nico" }), _jsx("input", { type: "email", className: `mt-1 w-full px-4 py-2 rounded-md border-b border-black bg-white text-sm text-black focus:outline-none ${emailError ? "border-red-500" : "focus:border-purple-500"}`, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "ejemplo@correo.com" }), emailError && _jsx("p", { className: "text-red-500 text-xs mt-1", children: emailError })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPassword ? "text" : "password", className: `mt-1 w-full px-4 py-2 rounded-md border-b border-black bg-white text-sm text-black focus:outline-none ${passwordError ? "border-red-500" : "focus:border-purple-500"}`, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "M\u00EDnimo 6 caracteres" }), _jsx("button", { type: "button", className: "absolute right-3 top-1/2 -translate-y-1/2 text-black", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), passwordError && _jsx("p", { className: "text-red-500 text-xs mt-1", children: passwordError })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50", children: isLoading ? "Iniciando sesión..." : "Iniciar sesión" }), _jsxs("div", { className: "relative flex items-center my-6", children: [_jsx("div", { className: "flex-grow border-t border-gray-300" }), _jsx("span", { className: "flex-shrink mx-4 text-white text-sm", children: "o continuar con" }), _jsx("div", { className: "flex-grow border-t border-gray-300" })] }), _jsxs("div", { className: "flex flex-col space-y-4", children: [_jsxs("button", { type: "button", onClick: () => handleSocialLogin("google"), disabled: !!socialLoading, className: "w-full py-2 bg-white text-gray-800 rounded-md font-semibold flex items-center justify-center gap-2 shadow hover:bg-gray-100 disabled:opacity-50", children: [_jsx("img", { src: "public/images/category-icons/xd.png", alt: "Google", className: "w-5 h-5" }), socialLoading === "google" ? "Procesando..." : "Continuar con Google"] }), _jsxs("button", { type: "button", onClick: () => handleSocialLogin("facebook"), disabled: !!socialLoading, className: "w-full py-2 bg-[#1877F2] text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#166FE5] disabled:opacity-50", children: [_jsx("img", { src: "public/images/category-icons/face.png", alt: "Facebook", className: "w-5 h-5 bg-white rounded-sm" }), socialLoading === "facebook" ? "Procesando..." : "Continuar con Facebook"] }), _jsxs("button", { type: "button", onClick: () => handleSocialLogin("apple"), disabled: !!socialLoading, className: "w-full py-2 bg-black text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50", children: [_jsx("img", { src: "public/images/category-icons/apple.png", alt: "Apple", className: "w-5 h-5" }), socialLoading === "apple" ? "Procesando..." : "Continuar con Apple"] })] }), loginError && _jsx("p", { className: "text-red-500 text-center text-sm mt-2", children: loginError })] }), _jsxs("p", { className: "text-center text-sm text-white mt-4", children: ["\u00BFNo tienes una cuenta?", " ", _jsx("button", { onClick: () => navigate("/register"), className: "text-white font-semibold hover:underline", children: "Registrarse" })] }), _jsx("div", { className: "mt-6 p-4 bg-black bg-opacity-50 rounded-lg", children: _jsxs("p", { className: "text-white text-sm text-center", children: [_jsx("strong", { children: "Credenciales de demo:" }), _jsx("br", {}), "Email: juan.perez@example.com", _jsx("br", {}), "Contrase\u00F1a: password123"] }) })] })] }));
};
export default Login;
