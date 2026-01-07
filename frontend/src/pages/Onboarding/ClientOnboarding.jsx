import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";

const steps = [
  { title: "Create IAM Role" },
  { title: "Add Customer Managed Policies" },
  { title: "Create Cost & Usage Report" },
];

export default function ClientOnboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((s) => !s)}
      />

      <main className="flex-1 w-full px-6 py-6 pb-28">
        <div className="flex items-start gap-6">
          <Sidebar selected="onboarding" collapsed={collapsed} />

          <div className="flex-1 bg-white border rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-2">
              Client Onboarding
            </h1>

            <p className="text-gray-600 mb-6">
              Step {activeStep + 1} of {steps.length}:{" "}
              <b>{steps[activeStep].title}</b>
            </p>

            {/* Step content placeholder */}
            <div className="border rounded-md p-6 bg-gray-50 text-gray-600">
              UI for <b>{steps[activeStep].title}</b> will go here.
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => s - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Back
              </button>

              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((s) => s + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
