import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Encabezado del modal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Professional House Cleaning</h2>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive house cleaning service with eco-friendly products
          </p>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6">
          {/* Información del proveedor */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-semibold">SJ</span>
            </div>
            <div>
              <p className="font-semibold">Sarah Johnson</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>4.8</span>
                <span className="mx-1">•</span>
                <span>127 reviews</span>
              </div>
              <p className="text-sm text-gray-500">Brooklyn, NY</p>
            </div>
          </div>

          {/* Detalles del servicio */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Comprehensive house cleaning service with eco-friendly products
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold">$80 - $120</p>
              <p className="text-sm text-green-600">Available Today</p>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="p-6 border-t border-gray-200">
          <button
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            onClick={onClose}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
