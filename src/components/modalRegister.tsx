import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

interface StepProps {
  prevStep?: () => void;
  nextStep: () => void;
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}

// Simulación de la función registerBusiness
const registerBusiness = async (formData: FormData): Promise<{ success: boolean; error?: string }> => {
  // Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulamos una respuesta exitosa en el 90% de los casos
  const success = Math.random() > 0.1;
  
  if (success) {
    return { success: true };
  } else {
    return { success: false, error: "Error simulado: No se pudo completar el registro. Intente nuevamente." };
  }
};

// Estilos actualizados con fondo oscuro y elementos blancos
const containerStyle = "relative min-h-screen w-full flex items-center justify-center px-4 py-6 overflow-hidden";
const backgroundStyle = "absolute inset-0 w-full h-full object-cover -z-10";
const cardStyle = "bg-transparent p-6 rounded-2xl w-full max-w-md";
const titleStyle = "text-2xl font-bold text-center text-white mb-2";
const subtitleStyle = "text-sm text-center text-white mb-4";
const labelStyle = "block font-semibold text-white";
const inputStyle = "w-full mt-1 p-2 rounded-md border border-white bg-transparent text-white placeholder-gray-300";
const buttonPrimaryStyle = "w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700";
const buttonSecondaryStyle = "w-full bg-gray-700 text-white py-2 rounded-md font-semibold hover:bg-gray-600";
const progressBarStyle = "w-full bg-gray-700 rounded-full h-2 mb-4";
const progressFillStyle = "bg-red-600 h-2 rounded-full";

// Componente del primer paso: Información básica
const BusinessForm = ({ nextStep, formData, setFormData }: StepProps) => {
  const [localFormData, setLocalFormData] = useState({
    businessName: formData.businessName,
    category: formData.category,
    description: formData.description
  });

  const categories = [
    "Salud", "Reparaciones del hogar", "Mercado de productos", "Tecnología",
    "Educación", "Entretenimiento", "Servicios financieros", "Belleza",
    "Reparación de autos", "Mantenimiento", "Otros",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const allFieldsFilled = Object.values(localFormData).every(value => value.trim() !== "");

  return (
    <div className={containerStyle}>
      <img 
        src="/images/category-icons/1.2.jpg" 
        alt="Fondo" 
        className={backgroundStyle}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/800x1000/1a202c/ffffff?text=Fondo+de+Pantalla";
        }}
      />
      
      <div className={cardStyle}>
        <div className="flex justify-center mb-6">
          <img 
            src="/images/category-icons/WRE.png" 
            alt="Logo" 
            className="h-66"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/200x100/374151/ffffff?text=WRE+Logo";
            }}
          />
        </div>

        <h2 className={titleStyle}>Registre su negocio</h2>
        <p className={subtitleStyle}>Complete el siguiente formulario para registrar su negocio</p>

        <form className="space-y-4 text-sm">
          <div>
            <label className={labelStyle}>Nombre de la empresa</label>
            <input 
              type="text" 
              name="businessName" 
              value={localFormData.businessName} 
              onChange={handleChange}
              className={inputStyle}
              placeholder="Ingrese el nombre de la empresa"
              required 
            />
          </div>

          <div>
            <label className={labelStyle}>Categoría</label>
            <select 
              name="category" 
              value={localFormData.category} 
              onChange={handleChange}
              className={`${inputStyle} bg-gray-800 text-white border border-purple-500 rounded-md p-2 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400`}
              required
            >
              <option value="" className="bg-gray-800 text-white">Seleccione una categoría</option>
              {categories.map(category => (
                <option 
                  key={category} 
                  value={category} 
                  className="bg-gray-800 text-white hover:bg-purple-100 hover:text-black"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyle}>Descripción del negocio</label>
            <textarea 
              name="description" 
              value={localFormData.description} 
              onChange={handleChange}
              className={inputStyle}
              rows={3}
              placeholder="Describa su negocio..."
              required 
            />
          </div>

          <button 
            type="button"
            className={`${buttonPrimaryStyle} ${!allFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={nextStep}
            disabled={!allFieldsFilled}
          >
            Siguiente
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente del segundo paso: Contacto y logo
const BusinessContact = ({ prevStep, nextStep, formData, setFormData }: StepProps) => {
  const [localFormData, setLocalFormData] = useState({
    email: formData.email,
    phone: formData.phone,
    image: formData.image
  });

  const [progress, setProgress] = useState(33);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email);
    const isValidPhone = /^[\d\s+-]{10,}$/.test(localFormData.phone);
    const hasLogo = localFormData.image !== null;

    const complete = isValidEmail && isValidPhone && hasLogo;
    setIsComplete(complete);
    setProgress(complete ? 66 : 33);
  }, [localFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLocalFormData(prev => ({ ...prev, image: file }));
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className={containerStyle}>
      <img 
        src="/images/category-icons/1.2.jpg" 
        alt="Fondo" 
        className={backgroundStyle}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/800x1000/1a202c/ffffff?text=Fondo+de+Pantalla";
        }}
      />
      
      <div className={cardStyle}>
        <h2 className={titleStyle}>Información de contacto</h2>
        <p className={subtitleStyle}>Proporcione los datos para contactar su negocio</p>

        <div className={progressBarStyle}>
          <div className={progressFillStyle} style={{ width: `${progress}%` }} />
        </div>

        <form className="space-y-4 text-sm">
          <div>
            <label className={labelStyle}>Logotipo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white border-dashed rounded-xl">
              <div className="space-y-1 text-center text-white">
                {localFormData.image ? (
                  <>
                    <img 
                      src={URL.createObjectURL(localFormData.image)} 
                      alt="Logo preview" 
                      className="mx-auto h-24 w-24 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLocalFormData(prev => ({ ...prev, image: null }));
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Eliminar imagen
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex text-sm">
                      <label className="relative cursor-pointer">
                        <span>Arrastre una imagen o haga clic</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <p className="text-xs">PNG, JPG hasta 2MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={localFormData.email}
              onChange={handleChange}
              className={inputStyle}
              placeholder="ejemplo@negocio.com"
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={localFormData.phone}
              onChange={handleChange}
              className={inputStyle}
              placeholder="55 1234 5678"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className={buttonSecondaryStyle}
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={nextStep}
              className={`${buttonPrimaryStyle} ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isComplete}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente del tercer paso: Ubicación
const BusinessLocation = ({ prevStep, nextStep, formData, setFormData }: StepProps) => {
  const [localFormData, setLocalFormData] = useState({
    street: formData.street,
    neighborhood: formData.neighborhood,
    city: formData.city,
    state: formData.state,
    postal_code: formData.postal_code,
    country: formData.country,
    operatingHours: formData.operatingHours,
    socialMediaLinks: formData.socialMediaLinks
  });

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const complete = localFormData.street.trim() !== "" && 
                    localFormData.neighborhood.trim() !== "" && 
                    localFormData.city.trim() !== "" && 
                    localFormData.state.trim() !== "" && 
                    localFormData.postal_code.trim() !== "" && 
                    localFormData.country.trim() !== "" &&
                    localFormData.operatingHours.trim() !== "";
    setIsComplete(complete);
  }, [localFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={containerStyle}>
      <img 
        src="/images/category-icons/1.2.jpg" 
        alt="Fondo" 
        className={backgroundStyle}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/800x1000/1a202c/ffffff?text=Fondo+de+Pantalla";
        }}
      />
      
      <div className={cardStyle}>
        <h2 className={titleStyle}>Ubicación del negocio</h2>
        <p className={subtitleStyle}>Proporcione la ubicación física de su negocio</p>

        <div className={progressBarStyle}>
          <div className={progressFillStyle} style={{ width: '100%' }} />
        </div>

        <form className="space-y-4 text-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>País</label>
              <input
                type="text"
                name="country"
                value={localFormData.country}
                onChange={handleChange}
                className={inputStyle}
                placeholder="México"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Estado</label>
              <input
                type="text"
                name="state"
                value={localFormData.state}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Ciudad de México"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Ciudad</label>
              <input
                type="text"
                name="city"
                value={localFormData.city}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Ciudad de México"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Colonia</label>
              <input
                type="text"
                name="neighborhood"
                value={localFormData.neighborhood}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Roma Norte"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelStyle}>Calle y número</label>
              <input
                type="text"
                name="street"
                value={localFormData.street}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Av. Paseo de la Reforma 123"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Código Postal</label>
              <input
                type="text"
                name="postal_code"
                value={localFormData.postal_code}
                onChange={handleChange}
                className={inputStyle}
                placeholder="06700"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Horario de operación</label>
            <input
              type="text"
              name="operatingHours"
              value={localFormData.operatingHours}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Lunes a Viernes: 9:00 - 18:00"
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Redes sociales (opcional)</label>
            <input
              type="text"
              name="socialMediaLinks"
              value={localFormData.socialMediaLinks}
              onChange={handleChange}
              className={inputStyle}
              placeholder="https://facebook.com/tunegocio"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className={buttonSecondaryStyle}
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={nextStep}
              className={`${buttonPrimaryStyle} ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isComplete}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente del cuarto paso: Verificación
const BusinessVerification = ({ prevStep, formData, setFormData }: StepProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    taxID: formData.taxID,
    professional_license: formData.professional_license,
    termsAccepted: formData.termsAccepted,
    previewDoc: ""
  });

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const complete = localFormData.taxID.trim() !== "" && 
                   localFormData.professional_license !== null && 
                   localFormData.termsAccepted;
    setIsComplete(complete);
  }, [localFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setLocalFormData(prev => ({ ...prev, [name]: val }));
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLocalFormData(prev => ({ 
        ...prev, 
        professional_license: file,
        previewDoc: URL.createObjectURL(file)
      }));
      setFormData(prev => ({ ...prev, professional_license: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Crear FormData para enviar
      const formDataToSend = new FormData();
      
      // Agregar todos los campos al formData
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, String(value));
        }
      });

      // Usar la función simulada registerBusiness
      const response = await registerBusiness(formDataToSend);
      
      if (response.success) {
        // Simulación exitosa - redirigir a página principal
        alert("¡Registro completado con éxito! (simulación)");
        navigate('/');
      } else {
        console.error('Error al registrar:', response.error);
        alert(response.error || 'Ocurrió un error al registrar. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor. Por favor intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={containerStyle}>
      <img 
        src="/images/category-icons/1.2.jpg" 
        alt="Fondo" 
        className={backgroundStyle}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/800x1000/1a202c/ffffff?text=Fondo+de+Pantalla";
        }}
      />
      
      <div className={cardStyle}>
        <h2 className={titleStyle}>Verificación final</h2>
        <p className={subtitleStyle}>Complete la información fiscal y legal</p>

        <div className={progressBarStyle}>
          <div className={progressFillStyle} style={{ width: '100%' }} />
        </div>

        <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
          <div>
            <label className={labelStyle}>RFC</label>
            <input
              type="text"
              name="taxID"
              value={localFormData.taxID}
              onChange={handleChange}
              className={inputStyle}
              placeholder="XAXX010101000"
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Licencia profesional</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white border-dashed rounded-xl">
              <div className="space-y-1 text-center text-white">
                {localFormData.previewDoc ? (
                  <>
                    <div className="mx-auto h-24 flex items-center">
                      <span>Documento cargado</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLocalFormData(prev => ({ 
                          ...prev, 
                          professional_license: null,
                          previewDoc: ""
                        }));
                        setFormData(prev => ({ ...prev, professional_license: null }));
                      }}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Eliminar documento
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex text-sm">
                      <label className="relative cursor-pointer">
                        <span>Arrastre un documento o haga clic</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.png"
                        />
                      </label>
                    </div>
                    <p className="text-xs">PDF, JPG o PNG hasta 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={localFormData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-white">
              Acepto los <a href="#" className="underline">términos y condiciones</a>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className={buttonSecondaryStyle}
              disabled={isLoading}
            >
              Anterior
            </button>
            <button
              type="submit"
              className={`${buttonPrimaryStyle} ${!isComplete || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isComplete || isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : 'Registrar negocio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente contenedor principal
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

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <>
      {step === 1 && <BusinessForm nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <BusinessContact prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <BusinessLocation prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 4 && <BusinessVerification prevStep={prevStep} formData={formData} setFormData={setFormData} />}
    </>
  );
};

export default ModalRegister;