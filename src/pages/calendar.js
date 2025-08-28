import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const LOCAL_STORAGE_KEY = "user_appointments";
const CalendarPage = () => {
    const navigate = useNavigate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
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
    const handleDateClick = (day) => {
        const chosen = new Date(year, month, day);
        chosen.setHours(0, 0, 0, 0);
        if (chosen < today)
            return;
        setSelectedDate(chosen);
        setShowSuccessMsg(false);
    };
    const handleSchedule = () => {
        if (!selectedDate || !selectedTime)
            return;
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
        const newAppointment = {
            id: appointmentId,
            date: finalDate.toISOString(),
            message: `Cita agendada para el ${formattedDate}`,
            viewed: false,
        };
        const existingAppointments = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const updatedAppointments = [...existingAppointments, newAppointment];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAppointments));
        window.dispatchEvent(new CustomEvent("appointmentsUpdated", {
            detail: { action: "add", id: appointmentId },
        }));
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
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-50", children: [_jsx(Header, { title: "Calendario", showBackButton: true }), _jsxs("main", { className: "flex-grow p-4 max-w-md mx-auto", children: [_jsxs("h1", { className: "text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2", children: [_jsx(Calendar, { size: 24 }), " Agenda tu cita"] }), _jsxs("div", { className: "flex justify-between items-center mb-4 bg-white shadow rounded-lg p-2", children: [_jsx("button", { onClick: goToPreviousMonth, className: "px-3 py-1 text-black rounded hover:bg-gray-100 transition flex items-center", children: _jsx(ChevronLeft, { size: 20 }) }), _jsx("h2", { className: "text-lg font-semibold capitalize text-gray-700", children: monthYearStr }), _jsx("button", { onClick: goToNextMonth, className: "px-3 py-1 text-black rounded hover:bg-gray-100 transition flex items-center", children: _jsx(ChevronRight, { size: 20 }) })] }), _jsx("div", { className: "grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2", children: daysOfWeek.map((day) => (_jsx("div", { children: day }, day))) }), _jsxs("div", { className: "grid grid-cols-7 gap-2 text-center", children: [emptySlots.map((_, idx) => (_jsx("div", {}, `empty-${idx}`))), monthDays.map((day) => {
                                const thisDate = new Date(year, month, day);
                                thisDate.setHours(0, 0, 0, 0);
                                const isPast = thisDate < today;
                                const isToday = thisDate.toDateString() === new Date().toDateString();
                                const isSelected = selectedDate?.toDateString() === thisDate.toDateString();
                                return (_jsx("button", { onClick: () => handleDateClick(day), disabled: isPast, className: `p-2 rounded-lg border transition 
                  ${isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""} 
                  ${isToday ? "bg-red-200 border-red-400 font-bold" : "border-gray-300"} 
                  ${isSelected ? "bg-black text-white border-gray-800" : ""} 
                  ${!isPast && !isSelected ? "hover:bg-gray-200" : ""}`, children: day }, day));
                            })] }), selectedDate && (_jsxs("div", { className: "mt-6 bg-white p-4 rounded-lg shadow", children: [_jsxs("label", { className: "block text-gray-700 font-medium mb-2 flex items-center gap-2", children: [_jsx(Clock, { size: 18 }), " Selecciona la hora"] }), _jsx("input", { type: "time", value: selectedTime, onChange: (e) => setSelectedTime(e.target.value), className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" })] })), _jsxs("div", { className: "mt-6 flex justify-center gap-4", children: [_jsx("button", { disabled: !selectedDate || !selectedTime, onClick: handleSchedule, className: `px-6 py-2 rounded-lg font-semibold text-white shadow-md 
              ${selectedDate && selectedTime
                                    ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"} transition`, children: "Confirmar cita" }), _jsx("button", { onClick: handleCancel, className: "px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 shadow-md hover:bg-gray-300 transition", children: "Cancelar" })] }), showSuccessMsg && selectedDate && selectedTime && (_jsxs("div", { className: "mt-4 p-4 bg-green-50 border border-green-300 rounded-lg text-green-800 text-center shadow flex flex-col items-center gap-2", children: [_jsx(CheckCircle, { className: "text-green-600", size: 24 }), _jsxs("p", { children: ["Cita agendada para", " ", _jsx("strong", { children: new Date(selectedDate.setHours(Number(selectedTime.split(":")[0]), Number(selectedTime.split(":")[1]))).toLocaleDateString("es-ES", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }) })] }), _jsx("span", { className: "text-sm text-gray-600", children: "Redirigiendo a notificaciones..." })] }))] }), _jsx(BottomNav, {})] }));
};
export default CalendarPage;
