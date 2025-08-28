import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        termsAccepted: false,
        phone: "",
    });
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const target = e.target;
        const { name, value, type, checked, files } = target;
        if (type === "file" && files) {
            setImage(files[0]);
        }
        else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };
    // Mock de registro (simulación sin backend)
    const mockRegister = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.random().toString(36).substring(2, 10), // id fake
                    token: "dummy-token-" + Date.now(),
                });
            }, 1000);
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }
        try {
            const response = await mockRegister();
            const userData = {
                id: response.id,
                role: formData.role,
                name: formData.full_name || formData.name,
                email: formData.email,
                username: formData.username || "",
                phone: formData.phone || "",
                image: image ? image.name : null, // solo guardamos el nombre del archivo
            };
            // Guardamos en localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.id);
            if (formData.role === "customer") {
                navigate("/");
            }
            else {
                navigate("/ModalRegister");
            }
        }
        catch (err) {
            setError("Ocurrió un error durante el registro");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen w-full flex items-center justify-center px-4 py-6 overflow-hidden", children: [_jsx("img", { src: "/images/category-icons/1.2.jpg", alt: "Fondo", className: "absolute inset-0 w-full h-full object-cover -z-10" }), _jsxs("div", { className: "w-full max-w-sm", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("img", { src: "/images/category-icons/WRE.png", alt: "WER Logo", className: "h-36" }) }), _jsx("h2", { className: "text-2xl font-bold text-center text-white mb-2", children: "Crear una cuenta" }), _jsx("p", { className: "text-sm text-center text-white mb-4", children: "Ingresa tu informaci\u00F3n para comenzar" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 text-sm", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Nombre Completo" }), _jsx("input", { type: "text", name: "full_name", placeholder: "Ingrese su nombre completo", value: formData.full_name, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Correo electr\u00F3nico" }), _jsx("input", { type: "email", name: "email", placeholder: "Introduce tu correo electr\u00F3nico", value: formData.email, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true })] }), formData.role === "customer" && (_jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Nombre de usuario" }), _jsx("input", { type: "text", name: "username", placeholder: "Elige un nombre de usuario", value: formData.username, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true })] })), formData.role === "owner" && (_jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Tel\u00E9fono" }), _jsx("input", { type: "text", name: "phone", placeholder: "Ingrese su n\u00FAmero de tel\u00E9fono", value: formData.phone, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true })] })), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Foto de perfil" }), _jsx("input", { type: "file", name: "image", accept: "image/*", onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { className: "block font-semibold text-white", children: "Contrase\u00F1a" }), _jsx("input", { type: showPassword ? "text" : "password", name: "password", placeholder: "Ingrese su contrase\u00F1a", value: formData.password, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true }), _jsx("button", { type: "button", className: "absolute right-3 top-8 text-black", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { className: "block font-semibold text-white", children: "Confirmar Contrase\u00F1a" }), _jsx("input", { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", placeholder: "Confirme su contrase\u00F1a", value: formData.confirmPassword, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", required: true }), _jsx("button", { type: "button", className: "absolute right-3 top-8 text-black", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-white", children: "Rol" }), _jsxs("select", { name: "role", value: formData.role, onChange: handleChange, className: "w-full mt-1 p-2 rounded-md bg-white text-black border", children: [_jsx("option", { value: "customer", children: "Cliente" }), _jsx("option", { value: "owner", children: "Propietario" })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "termsAccepted", checked: formData.termsAccepted, onChange: handleChange, className: "mr-2", required: true }), _jsxs("label", { className: "text-white", children: ["Acepto los ", _jsx("a", { href: "#", className: "underline", children: "t\u00E9rminos y condiciones" })] })] }), error && _jsx("p", { className: "text-red-500 text-sm", children: error }), _jsx("button", { type: "submit", className: "w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700", disabled: loading, children: loading ? "Registrando..." : "Registro" })] }), _jsxs("p", { className: "text-center text-white mt-4 text-sm", children: ["\u00BFYa tienes una cuenta?", " ", _jsx("button", { onClick: () => navigate("/login"), className: "text-red-400 underline", children: "Acceso" })] })] })] }));
};
export default Register;
