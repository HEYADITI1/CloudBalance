import React, { useState, useMemo } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import FilterPanel from "./FilterPanel";

import { costData } from "../../data/costExplorerData";
import { buildFusionData } from "../../utils/fusionMapper";

ReactFC.fcRoot(FusionCharts, Charts);

const MONTHS = [
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
];

export default function CostExplorer() {
  const [groupBy, setGroupBy] = useState("service");
  const [chartType, setChartType] = useState("mscolumn2d");
  const [collapsed, setCollapsed] = useState(false);

  /* ---------- DATA ---------- */
  const rows = costData[groupBy] || [];

  const dataset = useMemo(() => {
    return buildFusionData(rows);
  }, [rows]);

  /* ---------- CHART CONFIG ---------- */
  const chartConfig = useMemo(() => {
    return {
      type: chartType,
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Monthly Cloud Cost",
          xAxisName: "Month",
          yAxisName: "Cost ($)",
          numberPrefix: "$",
          theme: "fusion",
        },
        categories: [
          {
            category: MONTHS.map((m) => ({ label: m })),
          },
        ],
        dataset,
      },
    };
  }, [chartType, dataset]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 px-6 py-6">
        <div className="flex gap-6 items-start">
          {/* LEFT NAV */}
          <Sidebar selected="cost-explorer" collapsed={collapsed} />

          {/* MAIN + FILTER */}
          <div className="flex flex-1 gap-6">
            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold mb-1">Cost Explorer</h1>
              <p className="text-sm text-gray-500 mb-4">
                Analyze your cloud spend over time
              </p>

              {/* GROUP BY */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Group By:</span>
                {[
                  { key: "service", label: "Service" },
                  { key: "account", label: "Account ID" },
                  { key: "usage", label: "Usage Type" },
                ].map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setGroupBy(g.key)}
                    className={`px-3 py-1 text-sm rounded border ${
                      groupBy === g.key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* CHART TYPE */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setChartType("mscolumn2d")}
                  className={`px-3 py-1 text-sm rounded ${
                    chartType === "mscolumn2d"
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType("msline")}
                  className={`px-3 py-1 text-sm rounded ${
                    chartType === "msline"
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  Line
                </button>
              </div>

              {/* CHART */}
              <div className="border rounded-lg bg-white p-4">
                {dataset.length ? (
                  <ReactFC {...chartConfig} />
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-gray-400">
                    No data available
                  </div>
                )}
              </div>

              {/* TABLE */}
              <div className="mt-6 bg-white border rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left">
                        {groupBy === "service"
                          ? "Service"
                          : groupBy === "account"
                          ? "Account ID"
                          : "Usage Type"}
                      </th>
                      {MONTHS.map((m) => (
                        <th key={m} className="px-4 py-2 text-right">
                          {m}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.name} className="border-t">
                        <td className="px-4 py-2 font-medium">
                          {row.name}
                        </td>
                        {MONTHS.map((m) => (
                          <td key={m} className="px-4 py-2 text-right">
                            ${row[m].toLocaleString()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FILTER PANEL */}
            <div className="w-[280px] shrink-0 sticky top-20">
              <div className="bg-white border rounded-lg shadow-md p-4">
                <FilterPanel />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
