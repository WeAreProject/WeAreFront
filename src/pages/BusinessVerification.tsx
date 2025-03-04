import { useState, useEffect } from "react";

const BusinessVerification = ({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) => {
  const [formData, setFormData] = useState({
    taxID: "",
    document: null as File | null,
    previewDocument: "",
    termsAccepted: false
  });
  const [progress, setProgress] = useState(75);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const isValidTaxID = formData.taxID.trim().length > 0;
    const hasDocument = formData.document !== null;
    const acceptedTerms = formData.termsAccepted;
    
    if (isValidTaxID && hasDocument && acceptedTerms) {
      setProgress(100);
      setIsComplete(true);
    } else {
      setProgress(75);
      setIsComplete(false);
    }
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFormData({ ...formData, document: file, previewDocument: URL.createObjectURL(file) });
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
              value={formData.taxID} 
              onChange={handleChange} 
              className="w-full px-5 py-4 border rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 text-xl" 
              placeholder="Enter your tax ID" 
              required 
            />
            {!formData.taxID && <p className="text-red-500 text-sm mt-2">Tax ID is required</p>}
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-xl font-medium text-gray-700">Professional License/Certification</label>
            {formData.previewDocument ? (
              <div className="mt-4 flex flex-col items-center">
                <embed src={formData.previewDocument} className="w-full h-48 object-cover rounded-lg shadow" />
                <button type="button" onClick={() => setFormData({ ...formData, document: null, previewDocument: "" })} className="mt-2 text-red-500 text-sm hover:underline">
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
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="w-6 h-6 mt-1" />
            <label className="ml-4 text-lg text-gray-700">I agree to the terms and conditions</label>
          </div>
          {!formData.termsAccepted && <p className="text-red-500 text-sm mt-2">You must accept the terms and conditions</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition w-full sm:w-auto">
              Previous
            </button>
            <button 
              type="button" 
              onClick={isComplete ? nextStep : undefined} 
              className={`py-4 px-8 rounded-lg font-semibold transition w-full sm:w-auto ${isComplete ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} 
              disabled={!isComplete}
            >
              Submit & Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessVerification;
