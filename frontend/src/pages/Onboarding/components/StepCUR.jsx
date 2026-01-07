export default function StepCUR() {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-3">
      <h3 className="text-lg font-semibold">Create Cost & Usage Report</h3>

      <p>1. Open AWS Billing Dashboard</p>
      <p>2. Create a Cost & Usage Report</p>
      <p>3. Enable Resource IDs & Athena</p>

      <p className="text-sm text-gray-500">
        This is a one-time AWS configuration step.
      </p>
    </div>
  );
}
