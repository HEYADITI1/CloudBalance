import clsx from "clsx";

export default function OnboardingButton({ label, clickFunction, name, disabled }) {
  return (
    <button
      disabled={disabled}
      name={name}
      onClick={clickFunction}
      className={`px-6 py-2 rounded text-sm font-medium transition
        ${
          disabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
    >
      {label}
    </button>
  );
};