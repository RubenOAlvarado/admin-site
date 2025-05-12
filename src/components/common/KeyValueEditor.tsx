import { useState, useEffect } from 'react';

type KeyValuePair = { key: string; value: string };

interface KeyValueEditorProps {
  value?: Record<string, string>;
  onChange: (val: Record<string, string>) => void;
}

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({ value = {}, onChange }) => {
  const [pairs, setPairs] = useState<KeyValuePair[]>(
    Object.entries(value).map(([key, value]) => ({ key, value }))
  );

  const [duplicateKeys, setDuplicateKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    detectDuplicates(pairs);
    onChange(convertToObject(pairs));
  }, [pairs]);

  const detectDuplicates = (items: KeyValuePair[]) => {
    const keyCounts: Record<string, number> = {};
    items.forEach(({ key }) => {
      if (key.trim()) keyCounts[key] = (keyCounts[key] || 0) + 1;
    });
    const duplicates = new Set(Object.keys(keyCounts).filter((k) => keyCounts[k] > 1));
    setDuplicateKeys(duplicates);
  };

  const handleAdd = () => {
    setPairs([...pairs, { key: '', value: '' }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...pairs];
    updated.splice(index, 1);
    setPairs(updated);
  };

  const handleChange = (index: number, field: 'key' | 'value', newValue: string) => {
    const updated = [...pairs];
    updated[index] = { ...updated[index], [field]: newValue };
    setPairs(updated);
  };

  const convertToObject = (items: KeyValuePair[]) =>
    items.reduce((acc, { key, value }) => {
      if (key.trim() && !duplicateKeys.has(key)) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

  return (
    <div>
      {pairs.map((pair, index) => {
        const isDuplicate = duplicateKeys.has(pair.key);
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="e.g. CLIENT_KEY"
                className={`w-full p-2 border rounded ${
                  isDuplicate ? 'border-red-500' : 'border-gray-300'
                }`}
                value={pair.key}
                onChange={(e) => handleChange(index, 'key', e.target.value)}
              />
              {isDuplicate && (
                <p className="text-sm text-red-500 mt-1">Duplicated key</p>
              )}
            </div>
            <input
              type="text"
              placeholder="Value"
              className="flex-1 p-2 border rounded border-gray-300"
              value={pair.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              −
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
      >
        <span className="mr-1">＋</span> Add Another
      </button>
    </div>
  );
};
