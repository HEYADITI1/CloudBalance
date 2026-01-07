import { useState } from "react";
import { createCloudAccount } from "../../../api/cloudAccountApi";

export default function StepIamDetails({ onSuccess }) {
  const [form, setForm] = useState({
    accountName: "",
    accountId: "",
    arn: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await createCloudAccount(form);

      onSuccess(); // move to next step
    } catch (err) {
      setError(err.response?.data || "Failed to create cloud account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Create IAM Role & Enter Details</h3>

      <input
        name="accountName"
        placeholder="Account Name"
        value={form.accountName}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="accountId"
        placeholder="Account ID"
        value={form.accountId}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="arn"
        placeholder="IAM Role ARN"
        value={form.arn}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Cloud Account"}
      </button>
    </div>
  );
}
