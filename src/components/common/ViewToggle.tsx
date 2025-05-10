import { GridIcon } from "../ui/Icons/GridIcon";
import { TableIcon } from "../ui/Icons/TableIcon";

export default function ViewToggle({
  viewMode,
  onChange
}: {
  viewMode: 'grid' | 'table';
  onChange: (mode: 'grid' | 'table') => void;
}) {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`px-3 py-2 text-sm font-medium rounded-l-md ${
          viewMode === 'grid'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <GridIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange('table')}
        className={`px-3 py-2 text-sm font-medium rounded-r-md ${
          viewMode === 'table'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <TableIcon className="h-4 w-4" />
      </button>
    </div>
  );
}