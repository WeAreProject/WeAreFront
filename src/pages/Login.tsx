import { useState } from "react";
import { loginUser } from "../actions/login";
import { useNavigate } from "react-router-dom";
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
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-8">
      <div className="bg-white p-12 sm:p-16 rounded-3xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-8">
          Welcome back
        </h2>
        <p className="text-gray-600 text-center text-xl mb-10">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-700 text-xl font-medium">
              Email
            </label>
            <input
              type="email"
              className={`mt-3 w-full px-7 py-5 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-lg mt-2">{emailError}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-xl font-medium flex justify-between">
              Password
              <a href="#" className="text-purple-600 text-lg hover:underline">
                Forgot password?
              </a>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`mt-3 w-full px-7 py-5 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-6 top-8 text-gray-600 text-3xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-lg mt-2">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-700 text-white py-5 rounded-xl text-2xl font-semibold hover:bg-purple-800 transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        {loginError && (
          <p className="text-red-500 text-lg mt-4 text-center">{loginError}</p>
        )}
        <p className="text-center text-gray-700 text-xl mt-8">
          Don't have an account? {" "}
          <a href="#" className="text-purple-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
