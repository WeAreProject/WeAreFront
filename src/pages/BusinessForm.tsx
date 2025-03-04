import { useState } from "react";

const BusinessForm = ({ nextStep }: { nextStep: () => void }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
  });

  const categories = [
    "Health", "House repairs", "Product market", "Technology",
    "Education", "Entertainment", "Financial services", "Beauty",
    "Car repair", "Maintenance", "Others",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
  const progress = allFieldsFilled ? 25 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl lg:w-3/4">
        <h2 className="text-4xl font-bold text-center text-gray-900">Register Your Business</h2>
        <p className="text-gray-600 text-center mb-8 text-lg">Complete the form below to register your business</p>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-300 rounded-full h-4 mb-8">
          <div
            className="bg-purple-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-800 font-semibold text-lg">Business Name</label>
            <input 
              type="text" 
              name="businessName" 
              value={formData.businessName} 
              onChange={handleChange}
              className="mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold text-lg">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold text-lg">Business Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              maxLength={500} 
              rows={5}
              className="mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
              required 
            />
            <p className="text-right text-gray-500 text-sm">
              {formData.description.length} / 500 characters
            </p>
          </div>

          <button 
            type="button" 
            className="w-full bg-purple-700 text-white py-4 rounded-lg text-xl font-semibold hover:bg-purple-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextStep} 
            disabled={!allFieldsFilled}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;
