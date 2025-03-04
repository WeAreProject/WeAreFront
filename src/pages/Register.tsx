import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-12 md:p-16 lg:p-20 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Create an account</h2>
        <p className="text-gray-600 text-center mb-10 text-lg">Enter your information to get started</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-700 text-xl font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-xl font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-xl font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 text-xl font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-6 top-12 text-gray-600 text-2xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div className="relative">
            <label className="block text-gray-700 text-xl font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="absolute right-6 top-12 text-gray-600 text-2xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div>
            <label className="block text-gray-700 text-xl font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full px-6 py-4 border rounded-xl text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="customer">Customer</option>
              <option value="businessOwner">Business Owner</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-6 h-6"
              required
            />
            <label className="ml-3 text-gray-700 text-xl">
              I accept the <a href="#" className="text-purple-600 hover:underline">terms and conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-5 rounded-xl text-2xl font-semibold hover:bg-purple-800 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-700 text-xl mt-8">
          Already have an account? <a href="#" className="text-purple-600 font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
