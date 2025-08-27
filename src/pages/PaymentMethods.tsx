import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CreditCard, Trash2, X, PlusCircle } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

interface PaymentMethod {
  id: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const PaymentMethods = () => {
  const location = useLocation();
  const serviceName = location.state?.serviceName || null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", last4: "4242", expiryDate: "12/24", isDefault: true },
    { id: "2", last4: "1234", expiryDate: "08/25", isDefault: false },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      amount: 48.99,
      description: "Suscripción mensual",
      date: "3/10/2024",
      status: "completed",
    },
    {
      id: "2",
      amount: 48.99,
      description: "Suscripción mensual",
      date: "2/10/2024",
      status: "completed",
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      formattedValue = formattedValue.substring(0, 19);
    }

    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = formData.cardNumber.replace(/\s/g, "").slice(-4);
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      last4,
      expiryDate: formData.expiryDate,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods((prev) => [...prev, newPaymentMethod]);
    setIsModalOpen(false);
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />

      {/* Banner */}
      <div className="pt-24 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Métodos de Pago</h1>
        <p className="text-white/70">Administra tus tarjetas y transacciones</p>
      </div>

      {/* Mensaje de pago */}
      {serviceName && (
        <div className="bg-yellow-400/20 text-yellow-300 p-4 mt-6 mx-4 rounded-xl text-center font-semibold">
          Estás comprando el servicio: <span className="text-white">{serviceName}</span>
          <div className="mt-3">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition"
            >
              Pagar ahora
            </button>
          </div>
        </div>
      )}

      <main className="max-w-md mx-auto px-4 pt-8 pb-24 space-y-6">
        {/* Métodos de pago */}
        <section className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Tus métodos de pago</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={method.isDefault}
                    onChange={() => handleSetDefault(method.id)}
                    className="accent-cyan-500"
                  />
                  <CreditCard className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-white text-sm">•••• {method.last4}</p>
                    <p className="text-xs text-white/60">Expira {method.expiryDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Transacciones */}
        <section className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-3">Transacciones recientes</h3>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center bg-white/5 rounded-xl p-4 mb-3"
            >
              <div>
                <p className="text-xl font-semibold text-green-300">
                  ${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-white/80">{transaction.description}</p>
                <p className="text-xs text-white/50">{transaction.date}</p>
              </div>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                Completado
              </span>
            </div>
          ))}
        </section>
      </main>


   {/* Botón flotante para agregar */}
<button
  onClick={() => setIsModalOpen(true)}
  className="fixed bottom-24 right-6 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-xl transition"
>
  <PlusCircle className="w-6 h-6" />
</button>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div
            className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Añadir tarjeta</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400"
                required
              />
              <input
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="Nombre del titular"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  className="w-1/2 p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="CVV"
                  className="w-1/2 p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Guardar tarjeta
              </button>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default PaymentMethods;
