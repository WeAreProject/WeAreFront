import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  searchValue: string;
  statusValue: string;
}

export function SearchFilters({
  onSearchChange,
  onStatusChange,
  searchValue,
  statusValue,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by service or professional..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border rounded-md w-full px-3 py-2"
        />
      </div>
      <select
        value={statusValue}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-[180px] border rounded-md px-3 py-2"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
}
