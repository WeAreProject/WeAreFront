import { useState, useEffect } from "react";

interface BusinessDetailsProps {
  prevStep: () => void;
  nextStep: () => void;
}

const BusinessDetails = ({ prevStep, nextStep }: BusinessDetailsProps) => {
  const [formData, setFormData] = useState({
    businessLocation: "",
    operatingHours: "",
    socialMediaLinks: "",
  });

  const [progress, setProgress] = useState(50);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const hasBusinessLocation = formData.businessLocation.trim() !== "";
    const hasOperatingHours = formData.operatingHours.trim() !== "";

    if (hasBusinessLocation && hasOperatingHours) {
      setProgress(75);
      setIsComplete(true);
    } else {
      setProgress(50);
      setIsComplete(false);
    }
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-10">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Register Your Business</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Complete the form to register your business</p>

        <div className="w-full bg-gray-300 rounded-full h-4 mb-8">
          <div
            className="bg-purple-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <form className="space-y-8">
          {/* Business Location */}
          <div>
            <label className="block text-xl text-gray-700 font-semibold">Business Location</label>
            <div className="relative mt-3">
              <span className="absolute left-4 top-4 text-2xl text-gray-500">📍</span>
              <input
                type="text"
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleChange}
                className="pl-14 w-full px-5 py-4 text-lg border rounded-xl text-gray-900 focus:ring-4 focus:ring-purple-500"
                placeholder="Ej. Avenida Reforma 123, Ciudad de México"
                required
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <label className="block text-xl text-gray-700 font-semibold">Operating Hours</label>
            <div className="relative mt-3">
              <span className="absolute left-4 top-4 text-2xl text-gray-500">🕒</span>
              <input
                type="text"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleChange}
                className="pl-14 w-full px-5 py-4 text-lg border rounded-xl text-gray-900 focus:ring-4 focus:ring-purple-500"
                placeholder="Ej. Lunes a Viernes: 9:00 AM - 5:00 PM"
                required
              />
            </div>
          </div>

          {/* Social Media Links (optional) */}
          <div>
            <label className="block text-xl text-gray-700 font-semibold">Social Media Links (optional)</label>
            <div className="relative mt-3">
              <span className="absolute left-4 top-4 text-2xl text-gray-500">🌐</span>
              <input
                type="text"
                name="socialMediaLinks"
                value={formData.socialMediaLinks}
                onChange={handleChange}
                className="pl-14 w-full px-5 py-4 text-lg border rounded-xl text-gray-900 focus:ring-4 focus:ring-purple-500"
                placeholder="Ej. https://facebook.com/tu-negocio"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white py-4 px-8 text-lg rounded-xl font-bold hover:bg-gray-600 transition"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={isComplete ? nextStep : undefined}
              className={`py-4 px-8 text-lg rounded-xl font-bold transition ${
                isComplete
                  ? "bg-purple-700 text-white hover:bg-purple-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
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

export default BusinessDetails;
