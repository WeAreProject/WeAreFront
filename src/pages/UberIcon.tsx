// Nuevo componente UberIcon.tsx
const UberIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0Zm5.66 7.834v2.625h-2.474v4.682c0 .879.394 1.282 1.274 1.282.384 0 .699-.024 1.2-.072v2.174a11.43 11.43 0 0 1-1.761.134c-2.22 0-3.403-1.149-3.403-3.317V10.46H9.981V7.834h2.515V5.238h2.69v2.596h2.474Z"/>
  </svg>
);

export default UberIcon;
