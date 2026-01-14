export default function CostExplorerHeader({
  groupBy,
  setGroupBy,
  onToggleFilters,
  showFilters,
}) {
  const allGroups = [
    { key: "SERVICE", label: "Service" },
    { key: "PLATFORM", label: "Platform" },
    { key: "INSTANCE_TYPE", label: "Instance Type" },
    { key: "USAGE_TYPE", label: "Usage Type" },
    { key: "ACCOUNT_ID", label: "Account ID" },
    { key: "REGION", label: "Region" },
    { key: "USAGE_TYPE_GROUP", label: "Usage Type Group" },
    { key: "PURCHASE_OPTION", label: "Purchase Option" },
    { key: "API_OPERATION", label: "API Operation" },
    { key: "RESOURCE", label: "Resource" },
    { key: "AVAILABILITY_ZONE", label: "Availability Zone" },
    { key: "TENANCY", label: "Tenancy" },
    { key: "LEGAL_ENTITY", label: "Legal Entity" },
    { key: "BILLING_ENTITY", label: "Billing Entity" },
  ];

  const filterIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="10" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="14" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="8" cy="18" r="2" />
    </svg>
  );

  const ordered = [
    ...allGroups.filter((g) => g.key === groupBy),
    ...allGroups.filter((g) => g.key !== groupBy),
  ];

  const visible = ordered.slice(0, 6);
  const more = ordered.slice(6);

  return (
    <div className="bg-white p-4 rounded border border-gray-200 mb-4 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">Cost Explorer</h1>

      <p className="text-sm text-gray-500 mb-4">
        Analyze your cloud spend over time
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* GROUP BY*/}
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-sm font-medium text-gray-700">
            Group By:
          </span>

          {visible.map((g) => (
            <button
              key={g.key}
              onClick={() => setGroupBy(g.key)}
              className={`px-3 py-1 text-sm rounded border transition ${
                groupBy === g.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {g.label}
            </button>
          ))}

          {more.length > 0 && (
            <div className="relative group">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-700">
                More ▾
              </button>

              <div className="absolute z-20 hidden group-hover:block bg-white border border-gray-200 rounded shadow-md mt-1 min-w-[190px]">
                {more.map((g) => (
                  <div
                    key={g.key}
                    onClick={() => setGroupBy(g.key)}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {g.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FILTER*/}
        <button
          onClick={onToggleFilters}
          className={`p-2 border rounded transition ${
            showFilters
              ? "bg-blue-100 text-blue-600 border-blue-500"
              : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
          }`}
          title="Filters"
        >
          {filterIcon}
        </button>
      </div>
    </div>
  );
}
