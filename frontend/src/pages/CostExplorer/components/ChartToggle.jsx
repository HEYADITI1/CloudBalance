export default function ChartToggle({ chartType, setChartType }) {

  const btn = (type, icon) => (
    <button
      onClick={() => setChartType(type)}
      className={`p-2 rounded-lg border transition flex items-center justify-center
        ${chartType === type
          ? "bg-blue-100 border-blue-500 text-blue-600"
          : "bg-white border-gray-300 text-gray-400 hover:bg-gray-100"}
      `}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex gap-2">
      {btn("bar", barIcon)}
      {btn("line", lineIcon)}
      {btn("stacked", stackedIcon)}
    </div>
  );
}

/* ICONS */

const barIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="10" width="4" height="10"/>
    <rect x="10" y="6" width="4" height="14"/>
    <rect x="17" y="3" width="4" height="17"/>
  </svg>
);

const lineIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 17 9 11 13 15 21 7"/>
  </svg>
);

const stackedIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="12" width="5" height="8"/>
    <rect x="4" y="4" width="5" height="6"/>
    <rect x="13" y="9" width="5" height="11"/>
  </svg>
);

