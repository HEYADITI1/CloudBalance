import clsx from "clsx";
import React from "react";

const OnboardingButton = ({ label, disabled = false, name, clickFunction }) => {
  return (
    <button
      disabled={disabled}
      name={name}
      onClick={clickFunction}
      className={clsx(
        "bg-[#6366f1] h-10 w-20 rounded-md text-white transition-all duration-150",
        !disabled && "hover:cursor-pointer hover:shadow-xl",
        disabled && "bg-gray-400 cursor-not-allowed opacity-70"
      )}
    >
      {label}
    </button>
  );
};

export default OnboardingButton;
