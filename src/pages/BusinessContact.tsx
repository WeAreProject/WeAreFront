import { useState, useEffect } from "react";

const BusinessContact = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    businessLogo: null as File | null,
    previewLogo: ""
  });

  const [progress, setProgress] = useState(25);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidPhone = /^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/.test(formData.phone);
    const hasLogo = formData.businessLogo !== null;

    if (isValidEmail && isValidPhone && hasLogo) {
      setProgress(50);
      setIsComplete(true);
    } else {
      setProgress(25);
      setIsComplete(false);
    }
  }, [formData.email, formData.phone, formData.businessLogo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        businessLogo: file,
        previewLogo: URL.createObjectURL(file)
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-3xl lg:max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Register your business</h2>
        <p className="text-gray-600 text-center mb-8 text-lg">Complete the form to register your business</p>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div className="bg-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <form className="space-y-8">
          <div>
            <label className="block text-gray-700 font-semibold text-lg">Business Logo</label>
            {formData.previewLogo ? (
              <div className="mt-4 flex flex-col items-center">
                <img src={formData.previewLogo} alt="Business Logo" className="w-40 h-40 object-cover rounded-xl shadow-lg" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, businessLogo: null, previewLogo: "" })}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="mt-4 w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-purple-500 transition">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                  <div className="text-gray-500 text-3xl">⬆️</div>
                  <span className="text-gray-500 text-lg">Drag an image or click to select</span>
                </label>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Email Address</label>
            <div className="relative mt-3">
              <span className="absolute left-4 top-4 text-gray-500 text-xl">✉️</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 border rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Phone Number</label>
            <div className="relative mt-3">
              <span className="absolute left-4 top-4 text-gray-500 text-xl">📞</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 border rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-600 transition"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className={`py-4 px-8 rounded-xl text-lg font-semibold transition ${
                isComplete ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isComplete}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessContact;
