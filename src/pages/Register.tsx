import { useState } from "react";
import { registerCustomer, registerOwner } from "../actions/register";
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
    image: null,
    phone: "", 
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    const form = new FormData();
  
    const nameField = formData.role === "customer" ? "full_name" : "name";
    const userId = localStorage.getItem("userId");

    form.append(nameField, formData.full_name || formData.name); 
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("role", formData.role);
    console.log("Datos del formulario antes de enviar:", formData);
    console.log("Role seleccionado:", formData.role);
    
    if (userId) {
      console.log("ID recuperado del localStorage:", userId);
    }
    if (formData.role === "owner") {
      form.append("phone", formData.phone); 
      console.log("Agregando teléfono para owner:", formData.phone);
    }
    if (formData.role === "customer") {
      form.append("username", formData.username);
    }
    if (image) form.append("image", image);
  
    try {
      let response;
      if (formData.role === "customer") {
        console.log("Registrando customer...");
        response = await registerCustomer(form); 
      } else if (formData.role === "owner") {
        console.log("Registrando owner...");
        response = await registerOwner(form);
      }
  
      console.log("Respuesta del registro:", response);
   
      if (response && response.id) {
        // Guardar datos del usuario en localStorage
        const userData = {
          id: response.id,
          role: formData.role,
          name: formData.full_name || formData.name,
          email: formData.email
        };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.token || "dummy-token");
        localStorage.setItem("userId", response.id);
        
        console.log("Datos guardados en localStorage:", userData);
        console.log("Token guardado:", response.token);

        if (formData.role === "customer") {
          console.log("Redirigiendo a customer a /");
          navigate("/");
        } else if (formData.role === "owner") {
          console.log("Redirigiendo a owner a /ModalRegister");
          window.location.href = "/ModalRegister";
        }
      } else {
        console.error("No se recibió ID en la respuesta:", response);
      }
    } catch (err) {
      console.error("Error durante el registro:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred during registration";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Create an account
        </h2>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
          Enter your information to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {formData.role === "customer" && (
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a username"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Profile Picture
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="customer">Customer</option>
              <option value="owner">Business Owner</option>
            </select>
          </div>

          {formData.role === "owner" && (
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              required
            />
            <label className="ml-3 text-gray-700 text-sm sm:text-base">
              I accept the{" "}
              <a href="#" className="text-purple-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-purple-800 transition duration-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-700 text-sm sm:text-base mt-6">
          Already have an account?{" "}
          <button 
            onClick={() => navigate('/login')}
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
