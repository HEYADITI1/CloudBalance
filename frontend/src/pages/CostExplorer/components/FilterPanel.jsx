import { useState, useEffect } from "react";

const FILTER_CONFIG = {
  SERVICE: [
    "Amazon EC2",
    "Amazon S3",
    "Amazon RDS",
    "AWS Lambda",
    "Amazon DynamoDB",
  ],

  REGION: [
    "ap-south-1",
    "ap-southeast-1",
    "us-east-1",
    "us-west-2",
    "eu-west-1",
  ],

  PLATFORM: [
    "Linux",
    "Windows",
    "MySQL",
    "PostgreSQL",
    "Aurora MySQL",
  ],

  ACCOUNT_ID: [
    "123456789012",
    "210987654321",
    "345678901234",
  ],

  PURCHASE_OPTION: [
    "OnDemand",
    "Reserved",
    "SavingsPlan",
    "Spot",
  ],

  USAGE_TYPE: [
    "BoxUsage:t3.medium",
    "DataTransfer-Out-Bytes",
    "Requests-Tier1",
  ],
};


export default function FilterPanel({ filters, onApply, onReset, onClose }) {
  const [open, setOpen] = useState(null);
  const [localFilters, setLocalFilters] = useState(filters);

  const toggleValue = (key, value) => {
    setLocalFilters((prev) => {
      const list = prev[key] || [];
      if (list.includes(value)) {
        const updated = list.filter((v) => v !== value);
        if (!updated.length) {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        }
        return { ...prev, [key]: updated };
      }
      return { ...prev, [key]: [...list, value] };
    });
  };

  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const renderFilter = (key, label) => (
    <div className="border-b py-2">
      <div
        className="flex justify-between cursor-pointer font-medium text-sm"
        onClick={() => setOpen(open === key ? null : key)}
      >
        {label}
        <span>{localFilters[key]?.length || 0}</span>
      </div>

      {open === key && (
        <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
          {(FILTER_CONFIG[key] || []).map((v) => (
            <label key={v} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={localFilters[key]?.includes(v) || false}
                onChange={() => toggleValue(key, v)}
              />
              {v}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-72 bg-white border rounded h-full p-4 flex flex-col">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Filters</h3>
        <button className="text-blue-600 text-sm" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderFilter("SERVICE", "Service")}
        {renderFilter("REGION", "Region")}
        {renderFilter("PLATFORM", "Platform")}
        {renderFilter("ACCOUNT_ID", "Account ID")}
      </div>

      <div className="flex justify-between gap-2 mt-4 pt-3 border-t">
        <button
          onClick={() => {
            setLocalFilters({});
            onReset();
          }}
          className="px-3 py-1 border rounded text-sm"
        >
          Reset All
        </button>

        <button
          onClick={() => onApply(localFilters)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
