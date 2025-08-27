import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Bell, Calendar, CheckCircle, Trash2, Package, Briefcase } from "lucide-react";

const LOCAL_STORAGE_KEY = "user_appointments";

interface Appointment {
  id: string;
  date: string;
  message: string;
  viewed: boolean;
  status: string;
  type?: "agenda" | "fake"; // diferenciamos agenda real vs falsa
}

const NotificationsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadAppointments = () => {
      try {
        // notificaciones reales guardadas en localStorage
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsed: Appointment[] = saved ? JSON.parse(saved) : [];

        // notificaciones falsas (se regeneran siempre)
        const fake: Appointment[] = [
          {
            id: "f1",
            date: new Date().toISOString(),
            message: "📦 Tu paquete está en camino con ExpressPack",
            viewed: true,
            status: "pending",
            type: "fake",
          },
          {
            id: "f2",
            date: new Date().toISOString(),
            message: "💼 Nueva oferta de trabajo: Repartidor Express",
            viewed: true,
            status: "pending",
            type: "fake",
          },
          {
            id: "f3",
            date: new Date().toISOString(),
            message: "🛒 Descuento del 50% en tu próxima compra online",
            viewed: true,
            status: "pending",
            type: "fake",
          },
        ];

        // primero las falsas, luego las reales
        setAppointments([...fake, ...parsed.reverse()]);
      } catch (error) {
        console.error("Error loading appointments:", error);
        setAppointments([]);
      }
    };

    loadAppointments();

    const handleStorageChange = () => loadAppointments();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const deleteNotification = (id: string, type?: string) => {
    if (type === "fake") {
      // si es falsa, solo la quitamos del state
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } else {
      // si es agenda real, la eliminamos del localStorage también
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Appointment[] = saved ? JSON.parse(saved) : [];
      const updated = parsed.filter((a) => a.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Notificaciones" />

      <main className="flex-1 p-4 max-w-md mx-auto mt-16 pb-20">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-gray-500">
            <Bell size={48} className="mb-4 text-gray-300" />
            <p className="text-center">No tienes notificaciones</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 bg-white rounded-lg shadow border border-gray-200 flex items-start"
              >
                {appt.type === "fake" ? (
                  appt.message.includes("paquete") ? (
                    <Package size={20} className="text-green-500 mr-3 mt-1" />
                  ) : (
                    <Briefcase size={20} className="text-yellow-500 mr-3 mt-1" />
                  )
                ) : (
                  <Calendar size={20} className="text-blue-500 mr-3 mt-1" />
                )}

                <div className="flex-1 overflow-hidden">
                  <p className="font-medium break-words">{appt.message}</p>
                  <p className="text-sm text-gray-500 mt-1 break-words">
                    {formatDate(appt.date)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appt.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appt.status === "pending" ? "Pendiente" : "Completado"}
                    </span>
                    {!appt.viewed && (
                      <CheckCircle
                        size={16}
                        className="ml-2 text-green-500"
                      />
                    )}
                  </div>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => deleteNotification(appt.id, appt.type)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
