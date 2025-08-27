import React, { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const LOCAL_STORAGE_KEY = "user_appointments";

interface Appointment {
  id: string;
  date: string;
  message: string;
  viewed: boolean;
}

const CalendarPage = () => {
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const emptySlots = Array.from({ length: firstDay });
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setShowSuccessMsg(false);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setShowSuccessMsg(false);
  };

  const handleDateClick = (day: number) => {
    const chosen = new Date(year, month, day);
    chosen.setHours(0, 0, 0, 0);
    if (chosen < today) return;
    setSelectedDate(chosen);
    setShowSuccessMsg(false);
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const finalDate = new Date(selectedDate);
    finalDate.setHours(hours, minutes);

    const appointmentId = Date.now().toString();
    const formattedDate = finalDate.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newAppointment: Appointment = {
      id: appointmentId,
      date: finalDate.toISOString(),
      message: `Cita agendada para el ${formattedDate}`,
      viewed: false,
    };

    const existingAppointments = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAppointments));

    window.dispatchEvent(
      new CustomEvent("appointmentsUpdated", {
        detail: { action: "add", id: appointmentId },
      })
    );

    setShowSuccessMsg(true);
    setTimeout(() => navigate("/notifications"), 2000);
  };

  const handleCancel = () => {
    if (window.confirm("¿Seguro que quieres cancelar?")) {
      navigate(-1);
    }
  };

  const monthYearStr = currentMonth.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Calendario" showBackButton={true} />

      <main className="flex-grow p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <Calendar size={24} /> Agenda tu cita
        </h1>

        {/* Navegación Mes - Flechas negras */}
        <div className="flex justify-between items-center mb-4 bg-white shadow rounded-lg p-2">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-1 text-black rounded hover:bg-gray-100 transition flex items-center"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold capitalize text-gray-700">
            {monthYearStr}
          </h2>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 text-black rounded hover:bg-gray-100 transition flex items-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Cuadrícula del calendario */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {emptySlots.map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}

          {monthDays.map((day) => {
            const thisDate = new Date(year, month, day);
            thisDate.setHours(0, 0, 0, 0);

            const isPast = thisDate < today;
            const isToday = thisDate.toDateString() === new Date().toDateString();
            const isSelected = selectedDate?.toDateString() === thisDate.toDateString();

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={isPast}
                className={`p-2 rounded-lg border transition 
                  ${isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""} 
                  ${isToday ? "bg-red-200 border-red-400 font-bold" : "border-gray-300"} 
                  ${isSelected ? "bg-black text-white border-gray-800" : ""} 
                  ${!isPast && !isSelected ? "hover:bg-gray-200" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Selección de hora */}
        {selectedDate && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Clock size={18} /> Selecciona la hora
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Botones para agendar o cancelar */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            disabled={!selectedDate || !selectedTime}
            onClick={handleSchedule}
            className={`px-6 py-2 rounded-lg font-semibold text-white shadow-md 
              ${selectedDate && selectedTime
                ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"} transition`}
          >
            Confirmar cita
          </button>

          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 shadow-md hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>

        {/* Mensaje de éxito */}
        {showSuccessMsg && selectedDate && selectedTime && (
          <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg text-green-800 text-center shadow flex flex-col items-center gap-2">
            <CheckCircle className="text-green-600" size={24} />
            <p>
              Cita agendada para{" "}
              <strong>
                {new Date(selectedDate.setHours(
                  Number(selectedTime.split(":")[0]),
                  Number(selectedTime.split(":")[1])
                )).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </p>
            <span className="text-sm text-gray-600">
              Redirigiendo a notificaciones...
            </span>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;