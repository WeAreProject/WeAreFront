import React from "react";
import { X } from "lucide-react";

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza.

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          onClick={onClose} // Llamada a onClose para cerrar el modal.
        >
          <X size={20} />
        </button>

        {/* Encabezado del modal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add New Experience</h2>
          <p className="text-sm text-gray-500 mt-1">Provide details about your professional experience.</p>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6">
          <input className="w-full border rounded p-2 mt-4" placeholder="Job Title" />
          <input className="w-full border rounded p-2 mt-2" placeholder="Company Name" />
          <input className="w-full border rounded p-2 mt-2" placeholder="Period" />
          <textarea className="w-full border rounded p-2 mt-2" placeholder="Description"></textarea>
        </div>

        {/* Pie del modal */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            {/* Botón Cancelar */}
            <button
              onClick={onClose} // Cierra el modal cuando se hace clic en Cancel.
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            {/* Botón para agregar la experiencia */}
            <button
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceModal;