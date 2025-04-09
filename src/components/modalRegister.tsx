import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../actions/register";
import { locationService, Country, State, City } from '../services/locationService';

interface FormState {
  businessName: string;
  category: string;
  description: string;
  email: string;
  phone: string;
  operatingHours: string;
  socialMediaLinks: string;
  taxID: string;
  image: File | null;
  professional_license: File | null;
  termsAccepted: boolean;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface BusinessFormData {
  business_name: string;
  category: string;
  description: string;
  email: string;
  phone: string;
  operation_hours: string;
  social_media_links: string;
  tax_id: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  image: File | null;
  professional_license: File | null;
}

interface BusinessContactProps {
  prevStep: () => void;
  nextStep: () => void;
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}

interface BusinessDetailsProps {
  prevStep: () => void;
  nextStep: () => void;
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}

interface BusinessFormProps {
  nextStep: () => void;
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}

const BusinessForm = ({ nextStep, formData, setFormData }: BusinessFormProps) => {
  const [localFormData, setLocalFormData] = useState<{
    businessName: string;
    category: string;
    description: string;
  }>({
    businessName: formData.businessName,
    category: formData.category,
    description: formData.description
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

const BusinessContact = ({ prevStep, nextStep, formData, setFormData }: BusinessContactProps) => {
  const [localFormData, setLocalFormData] = useState<{
    email: string;
    phone: string;
    image: File | null;
    professional_license: File | null;
  }>({
    email: formData.email || '',
    phone: formData.phone || '',
    image: null,
    professional_license: null
  });

  const [progress, setProgress] = useState(25);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email);
    const isValidPhone = /^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/.test(localFormData.phone);
    const hasLogo = localFormData.image !== null;

    if (isValidEmail && isValidPhone && hasLogo) {
      setProgress(50);
      setIsComplete(true);
    } else {
      setProgress(25);
      setIsComplete(false);
    }
  }, [localFormData.email, localFormData.phone, localFormData.image]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setLocalFormData(prev => ({ ...prev, image: file }));
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleNext = () => {
    setFormData(prev => ({
      ...prev,
      email: localFormData.email,
      phone: localFormData.phone,
      image: localFormData.image
    }));
    nextStep();
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
            {localFormData.image ? (
              <div className="mt-4 flex flex-col items-center">
                <img src={URL.createObjectURL(localFormData.image)} alt="Business Logo" className="w-40 h-40 object-cover rounded-xl shadow-lg" />
                <button
                  type="button"
                  onClick={() => setLocalFormData({ ...localFormData, image: null })}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="mt-4 w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-purple-500 transition">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="business-logo-upload" 
                />
                <label htmlFor="business-logo-upload" className="flex flex-col items-center cursor-pointer">
                  <div className="text-gray-500 text-3xl">📸</div>
                  <span className="text-gray-500 text-lg mt-2">Arrastra una imagen o haz clic para seleccionar</span>
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
              onClick={handleNext}
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

const BusinessDetails = ({ prevStep, nextStep, formData, setFormData }: BusinessDetailsProps) => {
  const [localFormData, setLocalFormData] = useState<{
    operatingHours: string;
    socialMediaLinks: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }>({
    operatingHours: formData.operatingHours,
    socialMediaLinks: formData.socialMediaLinks,
    street: formData.street,
    neighborhood: formData.neighborhood,
    city: formData.city,
    state: formData.state,
    postal_code: formData.postal_code,
    country: formData.country
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setFormData(prev => ({
      ...prev,
      operatingHours: localFormData.operatingHours,
      socialMediaLinks: localFormData.socialMediaLinks,
      street: localFormData.street,
      neighborhood: localFormData.neighborhood,
      city: localFormData.city,
      state: localFormData.state,
      postal_code: localFormData.postal_code,
      country: localFormData.country
    }));
    nextStep();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900">Registra tu Negocio</h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubicación del Negocio</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                  <input
                    type="text"
                    name="country"
                    value={localFormData.country}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa el país"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado/Provincia</label>
                  <input
                    type="text"
                    name="state"
                    value={localFormData.state}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa el estado o provincia"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    value={localFormData.city}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa la ciudad"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={localFormData.neighborhood}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa la colonia"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                  <input
                    type="text"
                    name="street"
                    value={localFormData.street}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa la calle"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={localFormData.postal_code}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ingresa el código postal"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horario de Operación</label>
              <input
                type="text"
                name="operatingHours"
                value={localFormData.operatingHours}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Ej: Lunes a Viernes: 9:00 AM - 5:00 PM"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Redes Sociales (opcional)</label>
              <input
                type="text"
                name="socialMediaLinks"
                value={localFormData.socialMediaLinks}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Ej. https://facebook.com/tu-negocio"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // Obtener el owner_id del localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('No se encontró la información del usuario');
      }
      
      const user = JSON.parse(userData);
      if (!user.id) {
        throw new Error('No se encontró el ID del usuario');
      }

      const formDataToSend = new FormData();
      
      // Agregar el owner_id primero
      formDataToSend.append('owner_id', user.id.toString());
      
      // Agregar todos los campos del formulario
      formDataToSend.append('business_name', formData.businessName.trim());
      formDataToSend.append('category', formData.category.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('operation_hours', formData.operatingHours.trim());
      formDataToSend.append('social_media_links', formData.socialMediaLinks.trim());
      formDataToSend.append('tax_id', localFormData.taxID.trim());
      formDataToSend.append('street', formData.street.trim());
      formDataToSend.append('neighborhood', formData.neighborhood.trim());
      formDataToSend.append('city', formData.city.trim());
      formDataToSend.append('state', formData.state.trim());
      formDataToSend.append('postal_code', formData.postal_code.trim());
      formDataToSend.append('country', formData.country.trim());

      // Verificar que los archivos existan antes de enviarlos
      if (!localFormData.document || !formData.image) {
        throw new Error('Image and professional license are required');
      }

      // Agregar archivos
      formDataToSend.append('professional_license', localFormData.document);
      formDataToSend.append('image', formData.image);

      // Verificar que todos los campos requeridos estén presentes
      const requiredFields = [
        'owner_id', 'business_name', 'category', 'description', 'email', 
        'phone', 'operation_hours', 'street', 'neighborhood', 'city', 
        'state', 'postal_code', 'country', 'tax_id'
      ];

      for (const field of requiredFields) {
        const value = formDataToSend.get(field);
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          throw new Error(`El campo ${field} es requerido`);
        }
      }

      // Mostrar los datos que se van a enviar
      const formDataObj: any = {};
      formDataToSend.forEach((value, key) => {
        formDataObj[key] = value instanceof File ? value.name : value;
      });
      console.log('FormData siendo enviado:', formDataObj);
    
      const response = await registerBusiness(formDataToSend);
      if (response.success) {
        console.log('Negocio registrado exitosamente:', response.data);
        // Redireccionar a la página de inicio
        navigate('/');
      } else {
        console.error('Error al registrar el negocio:', response.error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
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
  const [formData, setFormData] = useState<FormState>({
    businessName: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    operatingHours: "",
    socialMediaLinks: "",
    taxID: "",
    image: null,
    professional_license: null,
    termsAccepted: false,
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    postal_code: "",
    country: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div>
      {step === 1 && <BusinessForm nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <BusinessContact prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <BusinessDetails prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 4 && <BusinessVerification prevStep={prevStep} formData={formData} setFormData={setFormData} />}
    </div>
  );
};

export default ModalRegister;
