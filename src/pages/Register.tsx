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

  const [image, setImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;
    if (type === "file" && files) {
      setImage(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Mock de registro (simulación sin backend)
  const mockRegister = async () => {
    return new Promise<{ id: string; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 10), // id fake
          token: "dummy-token-" + Date.now(),
        });
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      } else {
        navigate("/ModalRegister");
      }
    } catch (err) {
      setError("Ocurrió un error durante el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-6 overflow-hidden">
      <img
        src="/images/category-icons/1.2.jpg"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/images/category-icons/WRE.png" alt="WER Logo" className="h-36" />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">Crear una cuenta</h2>
        <p className="text-sm text-center text-white mb-4">Ingresa tu información para comenzar</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold text-white">Nombre Completo</label>
            <input
              type="text"
              name="full_name"
              placeholder="Ingrese su nombre completo"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-white">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Introduce tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
              required
            />
          </div>

          {formData.role === "customer" && (
            <div>
              <label className="block font-semibold text-white">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                placeholder="Elige un nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-white text-black border"
                required
              />
            </div>
          )}

          {formData.role === "owner" && (
            <div>
              <label className="block font-semibold text-white">Teléfono</label>
              <input
                type="text"
                name="phone"
                placeholder="Ingrese su número de teléfono"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-white text-black border"
                required
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-white">Foto de perfil</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
              required
            />
          </div>

          <div className="relative">
            <label className="block font-semibold text-white">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block font-semibold text-white">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme su contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            <label className="block font-semibold text-white">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white text-black border"
            >
              <option value="customer">Cliente</option>
              <option value="owner">Propietario</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-white">
              Acepto los <a href="#" className="underline">términos y condiciones</a>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registro"}
          </button>
        </form>

        <p className="text-center text-white mt-4 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <button onClick={() => navigate("/login")} className="text-red-400 underline">
            Acceso
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
