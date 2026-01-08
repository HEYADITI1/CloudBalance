export default function FilterPanel() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
        <button className="text-xs text-blue-600 hover:underline">
          Reset All
        </button>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Filter items */}
      {[
        "Service",
        "Account ID",
        "Usage Type",
        "Platform",
        "Region",
      ].map((item) => (
        <div key={item} className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="rounded" />
            {item}
          </label>
          <span className="text-xs text-gray-400">Include only</span>
        </div>
      ))}
    </div>
  );
}
