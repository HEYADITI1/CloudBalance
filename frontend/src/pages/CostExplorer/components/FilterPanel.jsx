export default function FilterPanel({ filters, setFilters, onClose }) {
  const filterOptions = [
    { label: "Service", key: "SERVICE" },
    { label: "Account ID", key: "ACCOUNT_ID" },
    { label: "Usage Type", key: "USAGE_TYPE" },
    { label: "Platform", key: "PLATFORM" },
    { label: "Region", key: "REGION" },
  ];

  const handleToggle = (key, value) => {
    setFilters((prev) => {
      const list = prev[key]?.split(",") || [];
      if (list.includes(value)) {
        const updated = list.filter((v) => v !== value);
        if (!updated.length) {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        }
        return { ...prev, [key]: updated.join(",") };
      }
      return { ...prev, [key]: [...list, value].join(",") };
    });
  };

  return (
    <div className="w-64 border bg-white rounded h-full p-4 overflow-y-auto">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        <button className="text-blue-600 text-sm" onClick={onClose}>
          Close
        </button>
      </div>

      {filterOptions.map((f) => (
        <div key={f.key} className="mb-4">
          <div className="flex justify-between font-medium text-sm mb-1">
            {f.label}
            <span className="text-blue-600 text-xs">
              {filters[f.key]?.split(",").length || 0}
            </span>
          </div>

          {["Value1", "Value2", "Value3"].map((v) => (
            <label key={v} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters[f.key]?.includes(v) || false}
                onChange={() => handleToggle(f.key, v)}
                className="accent-blue-600"
              />
              {v}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
