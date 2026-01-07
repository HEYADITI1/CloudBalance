export default function StepPermissions() {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-3">
      <h3 className="text-lg font-semibold">Add Managed Policies</h3>

      <p>1. Go to IAM → Roles</p>
      <p>2. Open the created role</p>
      <p>3. Attach required managed policies</p>

      <p className="text-sm text-gray-500">
        (This step does not require any action in CloudBalance)
      </p>
    </div>
  );
}
