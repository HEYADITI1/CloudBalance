import { useEffect, useState } from "react";
import CostExplorerHeader from "./CostExplorerHeader";
import CostExplorerBody from "./CostExplorerBody";
import FilterPanel from "./FilterPanel";

export default function CostExplorerContainer() {
  const [groupBy, setGroupBy] = useState("SERVICE");
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-01-03");

  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [groupBy, fromDate, toDate, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        groupBy,
        from: fromDate,
        to: toDate,
        ...filters,
      });

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/cost/explorer?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER FULL WIDTH */}
      <CostExplorerHeader
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      {/* BODY + FILTER ROW */}
      <div className="flex gap-6 w-full">
        {/* BODY */}
        <div className="flex-1 w-full min-w-0">
          <CostExplorerBody
            groupBy={groupBy}
            data={data}
            loading={loading}
            error={error}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </div>

        {/* FILTER */}
        {showFilters && (
          <div className="w-72 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onApply={setFilters}
              onReset={() => setFilters({})}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
