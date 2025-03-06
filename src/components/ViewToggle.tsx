import { Grid, List } from "lucide-react";

interface ViewToggleProps {
  isGrid: boolean;
  onToggle: () => void;
}

export const ViewToggle = ({ isGrid, onToggle }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
      <button
        onClick={onToggle}
        className={`p-2 rounded-md transition-all duration-200 ${
          isGrid ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Grid size={20} />
      </button>
      <button
        onClick={onToggle}
        className={`p-2 rounded-md transition-all duration-200 ${
          !isGrid ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
};