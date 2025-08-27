import React, { useState, useRef } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const P2W = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [success, setSuccess] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleCancelClick = () => {
    const seguro = window.confirm("¿Seguro de cancelar :,v?");
    if (seguro) {
      navigate("/promo");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || !containerRef.current) return;

    const btn = btnRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    const btnCenterX = btn.left - container.left + btn.width / 2;
    const btnCenterY = btn.top - container.top + btn.height / 2;

    const distX = btnCenterX - mouseX;
    const distY = btnCenterY - mouseY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 120) {
      let moveX = distX * 0.35;
      let moveY = distY * 0.35;

      moveX = Math.min(Math.max(moveX, -40), 40);
      moveY = Math.min(Math.max(moveY, -40), 40);

      setOffset({ x: moveX, y: moveY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col text-white">
      <Header />

      <main className="flex-grow max-w-md w-full mx-auto px-6 pt-28 pb-28">
        <div
          className="rounded-3xl border border-white/20 p-8 shadow-2xl relative"
          style={{
            animation: "rgbGlow 4s ease-in-out infinite",
            background:
              "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
            backgroundSize: "300% 300%",
          }}
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">
            Pago con Tarjeta
          </h1>

          {success ? (
            <div className="flex flex-col items-center justify-center p-8 text-green-300 drop-shadow-lg">
              <CheckCircle className="w-16 h-16 mb-4" />
              <h2 className="text-xl font-semibold mb-2">¡Pago exitoso!</h2>
              <p className="text-center max-w-xs">
                Gracias por tu compra. Tu transacción ha sido procesada
                correctamente.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1">
                  Nombre del Titular
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-semibold mb-1">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={16}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block text-sm font-semibold mb-1">
                    Expira
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    required
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="cvc" className="block text-sm font-semibold mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition"
              >
                Confirmar Pago
              </button>
            </form>
          )}
        </div>

        {/* 🧲 Botón cancel que huye, ahora más dramático y abajo */}
        <div
          ref={containerRef}
          className="relative h-24 mt-10"
       
        >
          <button
            ref={btnRef}
            onClick={handleCancelClick}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-2xl transition-transform duration-200"
            style={{
              position: "absolute",
              top: `calc(50% + ${offset.y}px)`,
              left: `calc(50% + ${offset.x}px)`,
              transform: `translate(-50%, -50%) scale(${offset.x !== 0 || offset.y !== 0 ? 1.05 : 1})`,
              transition: "top 0.15s ease, left 0.15s ease, transform 0.15s ease",
            }}
            title="¿Cancelar compra?"
          >
             CANCELAR
          </button>
        </div>
      </main>

      <BottomNav className="z-20" />

      <style jsx global>{`
        @keyframes rgbGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default P2W;
