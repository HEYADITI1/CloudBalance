import { useMemo, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Charts);

export default function CostExplorerBody({
  groupBy,
  data,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) {
  const [chartType, setChartType] = useState("mscolumn2d");

  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const sortMonths = (a, b) => {
    const [m1, y1] = a.split(" ");
    const [m2, y2] = b.split(" ");
    if (y1 !== y2) return Number(y1) - Number(y2);
    return monthMap[m1] - monthMap[m2];
  };

  const chartData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0)
      return { months: [], dataset: [], table: [] };

    const isMonth = (v) => /\b\d{4}\b/.test(v) && /[A-Za-z]{3}/.test(v);
    const swap = isMonth(data[0].groupKey);

    const monthField = swap ? "groupKey" : "month";
    const groupField = swap ? "month" : "groupKey";

    const months = [...new Set(data.map((d) => d[monthField]))].sort(sortMonths);
    const groups = [...new Set(data.map((d) => d[groupField]))];

    const matrix = {};
    groups.forEach((g) => {
      matrix[g] = {};
      months.forEach((m) => (matrix[g][m] = 0));
    });

    data.forEach((d) => {
      matrix[d[groupField]][d[monthField]] = d.cost;
    });

    const dataset = groups.map((g) => ({
      seriesname: g,
      data: months.map((m) => ({ value: matrix[g][m] })),
    }));

    const table = groups.map((g) => ({
      name: g,
      values: months.map((m) => matrix[g][m]),
      total: months.reduce((s, m) => s + matrix[g][m], 0),
    }));

    return { months, dataset, table };
  }, [data]);

  const chartConfig = {
    type: chartType,
    width: "100%",
    height: "420",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "AWS Cost Analysis",
        subCaption: "Monthly breakdown",
        xAxisName: "Months",
        yAxisName: "Cost ($)",
        numberPrefix: "$",
        theme: "fusion",
        showLegend: "1",
        showValues: "0",
        showBorder: "0",
        bgColor: "#ffffff",
        canvasBgColor: "#ffffff",
        showCanvasBorder: "0",
        legendBorderAlpha: "0",
        divLineColor: "#e5e7eb",
        divLineAlpha: "100",
        chartTopMargin: "10",
        chartBottomMargin: "10",
      },
      categories: [
        { category: chartData.months.map((m) => ({ label: m })) },
      ],
      dataset: chartData.dataset,
    },
  };

  const iconBtn = (type, icon) => (
    <button
      onClick={() => setChartType(type)}
      className={`p-2 border rounded ${
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
      <div className="flex justify-end mb-3 gap-2">
        <div className="flex items-center border rounded px-2 py-1 bg-white">
          <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
          <span className="mx-2">-</span>
          <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
        </div>

        {iconBtn("mscolumn2d", <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="10" width="4" height="10"/><rect x="10" y="6" width="4" height="14"/><rect x="17" y="3" width="4" height="17"/></svg>)}
        {iconBtn("msline", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 17 9 11 13 15 21 7"/></svg>)}
        {iconBtn("stackedcolumn2d", <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="12" width="5" height="8"/><rect x="4" y="4" width="5" height="6"/><rect x="13" y="9" width="5" height="11"/></svg>)}
      </div>

      {/* CHART */}
      <div className="bg-white border border-gray-200 rounded-md p-3">
        <ReactFC {...chartConfig} />
      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                {groupBy.replace("_"," ")}
              </th>

              {chartData.months.map((m)=>(
                <th key={m} className="border border-gray-200 px-3 py-2 text-right font-semibold text-gray-700">
                  {m}
                </th>
              ))}

              <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-gray-700">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {chartData.table.map((row,i)=>(
              <tr key={i} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">{row.name}</td>

                {row.values.map((v,idx)=>(
                  <td key={idx} className="border border-gray-200 px-3 py-2 text-right">
                    {v ? `$${v.toLocaleString()}` : "-"}
                  </td>
                ))}

                <td className="border border-gray-200 px-3 py-2 text-right font-bold text-blue-600">
                  ${row.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
