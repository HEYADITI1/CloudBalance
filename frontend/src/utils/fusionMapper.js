const MONTHS = ["Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"];

export function buildFusionData(rows) {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => ({
    seriesname: row.name,
    data: MONTHS.map((m) => ({
      value: row[m],
    })),
  }));
}
