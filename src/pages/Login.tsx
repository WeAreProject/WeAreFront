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
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | "apple" | null>(null);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

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
  const mockLogin = async ({ email, password }: { email: string; password: string }) => {
    return new Promise<{ success: boolean; user?: any; message: string }>((resolve) => {
      setTimeout(() => {
        // Buscar usuario en los datos simulados
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          resolve({ success: true, user, message: "Login successful" });
        } else {
          resolve({ success: false, message: "Credenciales inválidas" });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    setLoginError("");

    if (!validateEmail(email)) {
      setEmailError("Formato de email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
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
        } else {
          setLoginError(response.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
        }
      } catch (error: any) {
        setLoginError(error.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // simulador login social
  const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
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

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-6 overflow-hidden">
      <img
        src="images/category-icons/1.2.jpg"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <img src="images/category-icons/WRE.png" alt="WER Logo" className="h-60" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white">Correo Electrónico</label>
            <input
              type="email"
              className={`mt-1 w-full px-4 py-2 rounded-md border-b border-black bg-white text-sm text-black focus:outline-none ${
                emailError ? "border-red-500" : "focus:border-purple-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-white">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`mt-1 w-full px-4 py-2 rounded-md border-b border-black bg-white text-sm text-black focus:outline-none ${
                  passwordError ? "border-red-500" : "focus:border-purple-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          {/* Botón login */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-white text-sm">o continuar con</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social logins */}
          <div className="flex flex-col space-y-4">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={!!socialLoading}
              className="w-full py-2 bg-white text-gray-800 rounded-md font-semibold flex items-center justify-center gap-2 shadow hover:bg-gray-100 disabled:opacity-50"
            >
              <img
                src="public/images/category-icons/xd.png"
                alt="Google"
                className="w-5 h-5"
              />
              {socialLoading === "google" ? "Procesando..." : "Continuar con Google"}
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              disabled={!!socialLoading}
              className="w-full py-2 bg-[#1877F2] text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#166FE5] disabled:opacity-50"
            >
              <img
                src="public/images/category-icons/face.png"
                alt="Facebook"
                className="w-5 h-5 bg-white rounded-sm"
              />
              {socialLoading === "facebook" ? "Procesando..." : "Continuar con Facebook"}
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialLogin("apple")}
              disabled={!!socialLoading}
              className="w-full py-2 bg-black text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50"
            >
              <img
                src="public/images/category-icons/apple.png"
                alt="Apple"
                className="w-5 h-5"
              />
              {socialLoading === "apple" ? "Procesando..." : "Continuar con Apple"}
            </button>
          </div>

          {loginError && <p className="text-red-500 text-center text-sm mt-2">{loginError}</p>}
        </form>

        <p className="text-center text-sm text-white mt-4">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-white font-semibold hover:underline"
          >
            Registrarse
          </button>
        </p>

        {/* Información de demo */}
        <div className="mt-6 p-4 bg-black bg-opacity-50 rounded-lg">
          <p className="text-white text-sm text-center">
            <strong>Credenciales de demo:</strong><br />
            Email: juan.perez@example.com<br />
            Contraseña: password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
