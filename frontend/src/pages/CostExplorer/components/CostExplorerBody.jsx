import { useMemo, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Charts);

export default function CostExplorerBody({ groupBy,
  data,
  loading,
  error,
  fromDate,
  toDate,
  setFromDate,
  setToDate, }) {
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

  const chartConfig =
  chartType === "stackedcolumn2d"
    ? {
        type: "stackedcolumn2d",
        width: "100%",
        height: "450",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "AWS Cost Analysis",
            subCaption: "Monthly breakdown by service",
            xAxisName: groupBy.replace("_", " "),
            yAxisName: "Cost ($)",
            numberPrefix: "$",
            theme: "fusion",
            showValues: "0",
            labelDisplay: "auto",
            showLegend: "1",
            legendPosition: "bottom",
            legendItemFontSize: "12",
            legendItemFontColor: "#666666",
            paletteColors: "#3b82f6,#06b6d4,#f97316,#84cc16,#eab308",
            bgColor: "#ffffff",
            canvasBgColor: "#ffffff",
            plotSpacePercent: "70",
            divLineAlpha: "20",
            baseFontSize: "13",
            baseFont: "Inter, sans-serif",
          },
          categories: [
            {
              category: chartData.map((d) => ({
                label: d.label,
              })),
            },
          ],
          dataset: [
            {
              seriesname: groupBy,
              data: chartData.map((d) => ({
                value: d.value,
              })),
            },
          ],
        },
      }
    : {
        type: chartType,
        width: "100%",
        height: "450",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "AWS Cost Analysis",
            subCaption: "Monthly breakdown by service",
            xAxisName: groupBy.replace("_", " "),
            yAxisName: "Cost ($)",
            numberPrefix: "$",
            theme: "fusion",
            showValues: "0",
            labelDisplay: "auto",
            showLegend: "1",
            legendPosition: "bottom",
            legendItemFontSize: "12",
            legendItemFontColor: "#666666",
            paletteColors: "#3b82f6,#06b6d4,#f97316,#84cc16,#eab308",
            bgColor: "#ffffff",
            canvasBgColor: "#ffffff",
            plotSpacePercent: "70",
            divLineAlpha: "20",
            baseFontSize: "13",
            baseFont: "Inter, sans-serif",
          },
          data: chartData,
        },
      };



  const iconBtn = (type, icon) => (
    <button
      onClick={() => setChartType(type)}
      className={`p-2 border rounded flex items-center justify-center ${
        chartType === type
          ? "bg-blue-100 border-blue-500 text-blue-600"
          : "bg-white border-gray-300 text-gray-400 hover:bg-gray-100"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <>
      {/* ICON CONTROLS */}
      <div className="flex justify-end mb-3">

        {/* DATE PICKER */}
  <div className="flex items-center border rounded px-2 py-1 bg-white">
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
        <div className="flex gap-2">
          {iconBtn(
            "column2d",
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="10" width="4" height="10" />
              <rect x="10" y="6" width="4" height="14" />
              <rect x="17" y="3" width="4" height="17" />
            </svg>
          )}

          {iconBtn(
            "line",
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 17 9 11 13 15 21 7" />
            </svg>
          )}

          {iconBtn(
            "stackedcolumn2d",
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="12" width="5" height="8" />
              <rect x="4" y="4" width="5" height="6" />
              <rect x="13" y="9" width="5" height="11" />
            </svg>
          )}
        </div>
      </div>

      {/* CHART */}
      <div className="border rounded bg-white p-4 shadow-sm">
        <ReactFC {...chartConfig} />
        <p className="text-sm text-gray-500 text-center mt-2">
          We are showing top {data.length} records by cost.
        </p>
      </div>

      {/* TABLE */}
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
