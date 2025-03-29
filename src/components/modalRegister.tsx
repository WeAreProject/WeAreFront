import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../actions/register";

const BusinessForm = ({ nextStep, formData, setFormData }: { 
  nextStep: () => void;
  formData: any;
  setFormData: (data: any) => void;
}) => {
  const [localFormData, setLocalFormData] = useState({
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
    setLocalFormData({ ...localFormData, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const allFieldsFilled = Object.values(localFormData).every(value => value.trim() !== "");
  const progress = allFieldsFilled ? 25 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl lg:w-3/4">
        <h2 className="text-4xl font-bold text-center text-gray-900">Register Your Business</h2>
        <p className="text-gray-600 text-center mb-8 text-lg">Complete the form below to register your business</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 mb-8">
          <div className="bg-purple-600 h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-800 font-semibold text-lg">Business Name</label>
            <input 
              type="text" 
              name="businessName" 
              value={localFormData.businessName} 
              onChange={handleChange}
              className="mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold text-lg">Category</label>
            <select 
              name="category" 
              value={localFormData.category} 
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
              value={localFormData.description} 
              onChange={handleChange} 
              maxLength={500} 
              rows={5}
              className="mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
              required 
            />
            <p className="text-right text-gray-500 text-sm">
              {localFormData.description.length} / 500 characters
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

const BusinessContact = ({ prevStep, nextStep }: {
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const [localFormData, setLocalFormData] = useState({
    email: "",
    phone: "",
    businessLogo: null as File | null,
    previewLogo: ""
  });

  const [progress, setProgress] = useState(25);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email);
    const isValidPhone = /^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/.test(localFormData.phone);
    const hasLogo = localFormData.businessLogo !== null;

    if (isValidEmail && isValidPhone && hasLogo) {
      setProgress(50);
      setIsComplete(true);
    } else {
      setProgress(25);
      setIsComplete(false);
    }
  }, [localFormData.email, localFormData.phone, localFormData.businessLogo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setLocalFormData({
        ...localFormData,
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
            {localFormData.previewLogo ? (
              <div className="mt-4 flex flex-col items-center">
                <img src={localFormData.previewLogo} alt="Business Logo" className="w-40 h-40 object-cover rounded-xl shadow-lg" />
                <button
                  type="button"
                  onClick={() => setLocalFormData({ ...localFormData, businessLogo: null, previewLogo: "" })}
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
                value={localFormData.email}
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
                value={localFormData.phone}
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
              className={`py-4 px-8 rounded-xl text-lg font-semibold transition ${isComplete ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
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

interface BusinessDetailsProps {
    prevStep: () => void;
    nextStep: () => void;
  }
const BusinessDetails = ({ prevStep, nextStep }: BusinessDetailsProps) => {
  const [localFormData, setLocalFormData] = useState({
    businessLocation: "",
    operatingHours: "",
    socialMediaLinks: "",
  });

  const [progress, setProgress] = useState(50);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const hasBusinessLocation = localFormData.businessLocation.trim() !== "";
    const hasOperatingHours = localFormData.operatingHours.trim() !== "";

    if (hasBusinessLocation && hasOperatingHours) {
      setProgress(75);
      setIsComplete(true);
    } else {
      setProgress(50);
      setIsComplete(false);
    }
  }, [localFormData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
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
                value={localFormData.businessLocation}
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
                value={localFormData.operatingHours}
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
                value={localFormData.socialMediaLinks}
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


const BusinessVerification = ({ prevStep, formData, setFormData }: { 
  prevStep: () => void; 
  formData: any;
  setFormData: (data: any) => void;
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

  const [localFormData, setLocalFormData] = useState({
    taxID: "",
    document: null as File | null,
    previewDocument: "",
    termsAccepted: false
  });
  const [progress, setProgress] = useState(75);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidTaxID = localFormData.taxID.trim().length > 0;
    const hasDocument = localFormData.document !== null;
    const acceptedTerms = localFormData.termsAccepted;
    
    if (isValidTaxID && hasDocument && acceptedTerms) {
      setProgress(100);
      setIsComplete(true);
    } else {
      setProgress(75);
      setIsComplete(false);
    }
  }, [localFormData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLocalFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setFormData((prev: any) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setLocalFormData({ ...localFormData, document: file, previewDocument: URL.createObjectURL(file) });
      setFormData((prev: any) => ({ ...prev, professional_license: file }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      const ownerId = localStorage.getItem("userId");

      if (!ownerId) {
        throw new Error("No se encontró el ID del propietario");
      }

      formDataToSend.append("owner_id", ownerId);
      formDataToSend.append("business_name", formData.businessName);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("location", formData.businessLocation);
      formDataToSend.append("operation_hours", formData.operatingHours);
      formDataToSend.append("social_media_links", formData.socialMediaLinks);
      formDataToSend.append("tax_id", localFormData.taxID);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      
      if (formData.professional_license) {
        formDataToSend.append("professional_license", formData.professional_license);
      }

      await registerBusiness(formDataToSend);
      navigate("/");
    } catch (error) {
      console.error("Error al registrar el negocio:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8">
      <div className="bg-white p-10 sm:p-12 md:p-16 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">Register Your Business</h2>
        <p className="text-gray-600 text-center mb-8">Complete the form below to register your business</p>
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div className="bg-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <form className="space-y-8">
          {/* Tax ID */}
          <div>
            <label className="block text-xl font-medium text-gray-700">Tax ID (RFC)</label>
            <input 
              type="text" 
              name="taxID" 
              value={localFormData.taxID} 
              onChange={handleChange} 
              className="w-full px-5 py-4 border rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 text-xl" 
              placeholder="Enter your tax ID" 
              required 
            />
            {!localFormData.taxID && <p className="text-red-500 text-sm mt-2">Tax ID is required</p>}
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-xl font-medium text-gray-700">Professional License/Certification</label>
            {localFormData.previewDocument ? (
              <div className="mt-4 flex flex-col items-center">
                <embed src={localFormData.previewDocument} className="w-full h-48 object-cover rounded-lg shadow" />
                <button type="button" onClick={() => setLocalFormData({ ...localFormData, document: null, previewDocument: "" })} className="mt-2 text-red-500 text-sm hover:underline">
                  Remove document
                </button>
              </div>
            ) : (
              <div className="mt-4 w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
                <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                  <div className="text-4xl text-gray-500">📂</div>
                  <span className="text-gray-500 text-xl">Drag and drop an image, or click to select</span>
                </label>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input type="checkbox" name="termsAccepted" checked={localFormData.termsAccepted} onChange={handleChange} className="w-6 h-6 mt-1" />
            <label className="ml-4 text-lg text-gray-700">I agree to the terms and conditions</label>
          </div>
          {!localFormData.termsAccepted && <p className="text-red-500 text-sm mt-2">You must accept the terms and conditions</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              onClick={prevStep} 
              className="bg-gray-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition w-full sm:w-auto"
              disabled={isLoading}
            >
              Previous
            </button>
            <button 
              type="button" 
              onClick={isComplete ? handleSubmit : undefined} 
              className={`py-4 px-8 rounded-lg font-semibold transition w-full sm:w-auto relative
                ${isComplete && !isLoading
                  ? "bg-purple-700 text-white hover:bg-purple-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} 
              disabled={!isComplete || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Registrando...</span>
                </div>
              ) : (
                "Submit & Verify"
              )}
            </button>
          </div>
        </form>

        {/* Overlay de carga */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Registrando tu negocio</h3>
                <p className="text-gray-600 text-center">Por favor, espera mientras procesamos tu registro...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ModalRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    businessLocation: "",
    operatingHours: "",
    socialMediaLinks: "",
    taxID: "",
    image: null,
    professional_license: null,
    termsAccepted: false
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div>
      {step === 1 && <BusinessForm nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <BusinessContact prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <BusinessDetails prevStep={prevStep} nextStep={nextStep} />}
      {step === 4 && <BusinessVerification prevStep={prevStep} formData={formData} setFormData={setFormData} />}
    </div>
  );
};

export default ModalRegister;
