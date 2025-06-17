import { useState } from 'react';
import { Banknote, CreditCard, PlusCircle, Trash2, X } from 'lucide-react';
import Header from '../components/Header';

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
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', last4: '4242', expiryDate: '12/24', isDefault: true },
    { id: '2', last4: '1234', expiryDate: '08/25', isDefault: false },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 48.99,
      description: 'Suscripción mensual',
      date: '3/10/2024',
      status: 'completed',
    },
    {
      id: '2',
      amount: 48.99,
      description: 'Suscripción mensual',
      date: '3/10/2024',
      status: 'completed',
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19);
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = formData.cardNumber.replace(/\s/g, '').slice(-4);
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      last4,
      expiryDate: formData.expiryDate,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setIsModalOpen(false);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
  };

  return (
    <>
      <Header />
      <div className="px-4 pt-20 max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Métodos de pago</h1>
              <p className="text-sm text-gray-500">Tus pagos y transacciones.</p>
            </div>
            <Banknote className="w-8 h-8 text-gray-600" />
          </div>

          <div className="flex flex-col items-center gap-3 mb-6">
            <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Sus métodos de pago
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800"
            >
              <PlusCircle className="w-4 h-4" />
              Agregar nuevo
            </button>
          </div>

          {/* Tarjetas guardadas */}
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={method.isDefault}
                    onChange={() => handleSetDefault(method.id)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">•••• {method.last4}</p>
                      <p className="text-xs text-gray-500">Vence {method.expiryDate}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Transacciones recientes */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Transacciones recientes</h2>
            <div className="flex flex-col gap-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-blue-200 rounded-xl p-3 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">${transaction.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{transaction.description}</p>
                        <p className="text-[11px] text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <span className="text-green-700 bg-green-100 text-xs px-2 py-1 rounded-full">
                      Terminado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-5 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-6">Añadir tarjeta</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titular
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expira
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Añadir tarjeta
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethods;
