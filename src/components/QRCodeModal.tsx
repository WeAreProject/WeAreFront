import { Download } from "lucide-react";
import { toast } from "sonner";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseId: string;
}

export function QRCodeModal({ isOpen, onClose, purchaseId }: QRCodeModalProps) {
  const handleDownload = () => {
    console.log('Downloading QR code for purchase:', purchaseId);
    toast.success("QR Code downloaded successfully");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 min-h-full w-full bg-black/50 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-center text-xl font-semibold">Purchase QR Code</h2>
            <div className="flex flex-col items-center space-y-6 py-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                {/* Placeholder for QR Code - in real app, generate based on purchaseId */}
                <div className="w-64 h-64 bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <p className="text-center text-gray-600 max-w-xs">
                Show this code to the professional to validate your purchase
              </p>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
              <button
                onClick={onClose}
                className="mt-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
