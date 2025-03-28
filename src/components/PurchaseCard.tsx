import { useState } from "react";
import { PurchaseStatus } from "./PurchaseStatus";
import { QRCodeModal } from "./QRCodeModal";
import { QrCode } from "lucide-react";

interface Purchase {
  id: string;
  image: string;
  serviceName: string;
  professionalName: string;
  date: string;
  price: number;
  status: "pending" | "completed" | "canceled";
}

interface PurchaseCardProps {
  purchase: Purchase;
}

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-lg border p-4 transition-all duration-300 hover:shadow-lg animate-fade-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-32 h-32 overflow-hidden rounded-md">
            <img
              src={purchase.image}
              alt={purchase.serviceName}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{purchase.serviceName}</h3>
              <p className="text-gray-600">{purchase.professionalName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <PurchaseStatus status={purchase.status} />
              <span className="text-sm text-gray-500">{purchase.date}</span>
              <span className="font-medium text-gray-900">
                ${purchase.price.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex md:flex-col justify-end gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-2 transition-colors border px-4 py-2 rounded hover:bg-primary hover:text-white"
            >
              <QrCode className="w-4 h-4" />
              View QR
            </button>
          </div>
        </div>
      </div>
      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        purchaseId={purchase.id}
      />
    </>
  );
}
