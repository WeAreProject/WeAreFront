import { useState } from 'react';
import { CreditCard, Trash2, X } from 'lucide-react';
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
      description: 'Monthly Subscription',
      date: '10/3/2024',
      status: 'completed',
    },
    {
      id: '2',
      amount: 99.99,
      description: 'Annual Service Fee',
      date: '10/3/2024',
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

    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
    }

    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    // Limit CVV to 3-4 digits
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
    
    // Create new payment method
    const last4 = formData.cardNumber.replace(/\s/g, '').slice(-4);
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      last4,
      expiryDate: formData.expiryDate,
      isDefault: paymentMethods.length === 0 // Make default if it's the first card
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
      <div className="container mx-auto px-4 pt-20 max-w-6xl">
        <h1 className="text-2xl font-bold mb-2">Payment Methods</h1>
        <p className="text-gray-600 mb-8">Manage your payment methods and view your transaction history</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Methods Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Payment Methods</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-purple-600 font-semibold hover:text-purple-700">
                + Add New
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Manage your saved payment methods</p>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      checked={method.isDefault}
                      onChange={() => handleSetDefault(method.id)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div>
                        <p className="font-medium">•••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <p className="text-sm text-gray-600 mb-4">Your latest payment activity</p>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-6">Add Payment Method</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
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
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
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
                Add Card
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethods; 