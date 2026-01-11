import { useMemo, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Charts);

export default function CostExplorerBody({ groupBy, data, loading, error }) {
  const [chartType, setChartType] = useState("column2d");

  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((d) => ({
      label: d.service || d.groupKey,
      value: d.cost,
    }));
  }, [data]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!data.length)
    return <div className="p-6 text-center">No data found</div>;

  const chartConfig = {
    type: chartType,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Cloud Cost",
        xAxisName: groupBy.replace("_", " "),
        yAxisName: "Cost ($)",
        numberPrefix: "$",
        theme: "fusion",
      },
      data: chartData,
    },
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <div className="flex gap-2">
          {["column2d", "line"].map((t) => (
            <button
              key={t}
              onClick={() => setChartType(t)}
              className={`px-3 py-1 text-sm border rounded ${
                chartType === t
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {t === "column2d" ? "Bar" : "Line"}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded bg-blue-600 text-white">
            Monthly
          </button>
          <button className="px-3 py-1 text-sm border rounded">Daily</button>
          <button className="px-3 py-1 text-sm border rounded">Yearly</button>
        </div>
      </div>

      <div className="border rounded bg-white p-4 shadow-sm">
        <ReactFC {...chartConfig} />
        <p className="text-sm text-gray-500 text-center mt-2">
          We are showing top {data.length} records by cost.
        </p>
      </div>

      <div className="mt-6 bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                {groupBy.replace("_", " ")}
              </th>
              <th className="px-4 py-2 text-right font-medium text-gray-600">
                Cost ($)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">
                  {row.service || row.groupKey}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-blue-600">
                  ${row.cost.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
