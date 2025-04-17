import { useState } from 'react';
import Header from '../components/Header';
import { Copy, Facebook, Mail, Twitter, Share2 } from 'lucide-react';

const Refer = () => {
  const [email, setEmail] = useState('');
  const referralCode = 'REF123XYZ'; // Este código podría venir de una API o del estado del usuario

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Aquí podrías agregar una notificación de "Copiado!"
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la invitación
    setEmail('');
  };

  const stats = [
    {
      value: 12,
      label: 'Total Referrals'
    },
    {
      value: '$120',
      label: 'Rewards Earned'
    },
    {
      value: '$30',
      label: 'Pending Rewards'
    }
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pt-20 max-w-2xl">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">Refer & Earn</h1>
          <p className="text-gray-600 text-center mb-8">
            Share your unique referral code with friends and earn rewards for
            every successful referral.
          </p>

          {/* Referral Code Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 text-center mb-2">Your Referral Code</p>
            <p className="text-sm text-gray-600 text-center mb-4">Share this code with your friends</p>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <code className="bg-white px-4 py-2 rounded-lg text-lg font-mono">
                {referralCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
                <Twitter className="w-5 h-5" />
                <span>X</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
                <span>More</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border text-center">
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Invite Form */}
          <div className="bg-white rounded-lg">
            <h3 className="font-semibold mb-2">Invite Friends</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your friend's email to send them an invitation
            </p>
            <form onSubmit={handleInvite} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Send Invite
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refer; 