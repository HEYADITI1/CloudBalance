export default function Stepper({ steps, activeStep }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center w-full">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${
                index <= activeStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {index + 1}
          </div>

          <span className="ml-2 text-sm">{label}</span>

          {index !== steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-3 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
