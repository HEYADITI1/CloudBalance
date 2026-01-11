export default function CostExplorerHeader({
  groupBy,
  setGroupBy,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onToggleFilters,
}) {
  const options = [
    { key: "SERVICE", label: "Service" },
    { key: "ACCOUNT_ID", label: "Account ID" },
    { key: "USAGE_TYPE", label: "Usage Type" },
    { key: "REGION", label: "Region" },
    { key: "PLATFORM", label: "Platform" },
  ];

  return (
    <div className="bg-white p-4 rounded border mb-4">
      <h1 className="text-xl font-semibold">Cost Explorer</h1>
      <p className="text-sm text-gray-500 mb-3">
        Analyze your cloud spend over time
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-sm font-medium">Group By:</span>
          {options.map((g) => (
            <button
              key={g.key}
              onClick={() => setGroupBy(g.key)}
              className={`px-3 py-1 text-sm rounded border ${
                groupBy === g.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded px-2 py-1">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="outline-none text-sm"
            />
            <span className="mx-2 text-gray-500">-</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

          <button
            onClick={onToggleFilters}
            className="p-2 border rounded hover:bg-gray-100"
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
}
