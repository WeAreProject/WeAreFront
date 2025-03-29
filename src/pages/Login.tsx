import { useState } from "react";
import { loginUser } from "../actions/login";
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

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
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
        const response = await loginUser({ email, password });
        
        // Si llegamos aquí, significa que el login fue exitoso
        if (response.message === "Login successful") {
          // Redirigimos a la página principal
          navigate('/');
        } else {
          setLoginError("Error inesperado en el inicio de sesión");
        }
      } catch (error: any) {
        setLoginError(error.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
          Welcome back
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-base sm:text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              className={`mt-2 w-full px-4 sm:px-5 py-3 sm:py-4 border rounded-xl text-gray-900 text-base sm:text-lg focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-sm sm:text-base mt-2">{emailError}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-base sm:text-lg font-medium flex justify-between items-center">
              Password
              <a href="#" className="text-purple-600 text-sm sm:text-base hover:underline">
                Forgot password?
              </a>
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 border rounded-xl text-gray-900 text-base sm:text-lg focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm sm:text-base mt-2">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-700 text-white py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:bg-purple-800 transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        {loginError && (
          <p className="text-red-500 text-sm sm:text-base mt-4 text-center">{loginError}</p>
        )}
        <p className="text-center text-gray-700 text-base sm:text-lg mt-6">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate('/register')}
            className="text-purple-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;