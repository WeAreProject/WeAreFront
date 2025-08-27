import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Copy, Facebook, Mail, Share2, Gift } from "lucide-react";

const Refer = () => {
  const [email, setEmail] = useState("");
  const referralCode = "REF123XYZ";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />

      <main className="pt-24 pb-32 px-4 max-w-md mx-auto">
        <div className="rounded-3xl border border-white/20 p-6 shadow-xl bg-black">
          <h1 className="text-3xl font-extrabold text-center mb-2">
            Recomienda y Gana
          </h1>
          <p className="text-center text-white font-medium mb-1">
            Comparte tu <span className="font-bold">código de referencia</span>
          </p>
          <p className="text-center text-white/60 text-sm mb-6">
            Invita amigos y obtén recompensas exclusivas.
          </p>

          {/* Código de Referencia */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-white/80 font-semibold mb-3">
              Tu código
            </p>
            <div className="flex items-center justify-between bg-white/20 px-4 py-3 rounded-lg shadow-inner">
              <span className="font-bold text-lg tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="hover:text-cyan-300 transition"
                title="Copiar código"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Botones de Compartir */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm rounded-xl py-2 transition">
              <Facebook className="w-5 h-5" />
              Facebook
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm rounded-xl py-2 transition">
              <Mail className="w-5 h-5" />
              Email
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm rounded-xl py-2 transition">
              <Share2 className="w-5 h-5" />
              Incógnito
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm rounded-xl py-2 transition">
              <Share2 className="w-5 h-5" />
              Más
            </button>
          </div>

          {/* Recompensas */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5" /> Tus Recompensas
            </h3>
            <div className="flex justify-between text-sm text-white/80">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-300">$120</p>
                <p>Ganadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-300">$30</p>
                <p>Próxima</p>
              </div>
            </div>
          </div>

          {/* Invitación por correo */}
          <div className="text-left">
            <h3 className="font-semibold mb-1">Invitar por correo</h3>
            <p className="text-sm text-white/70 mb-3">
              Introduce el correo de tu amigo para enviarle una invitación.
            </p>
            <form
              onSubmit={handleInvite}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amigo@ejemplo.com"
                required
                className="flex-1 p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="submit"
                className="bg-white hover:bg-gray-200 text-black px-4 py-3 rounded-lg font-semibold transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/20">
        <BottomNav />
      </div>
    </div>
  );
};

export default Refer;
