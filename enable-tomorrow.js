// enable-tomorrow.js
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

// Solo permite ejecutar el deploy mañana
if (
  today.getDate() === tomorrow.getDate() &&
  today.getMonth() === tomorrow.getMonth() &&
  today.getFullYear() === tomorrow.getFullYear()
) {
  console.log("✅ Hoy es el día de despliegue. Continuando...");
} else {
  console.log("⛔ La app no se habilitará hasta mañana.");
  process.exit(1);
}
