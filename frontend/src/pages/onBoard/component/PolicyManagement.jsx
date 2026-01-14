import React from "react";
import img1 from "../../../assets/onbording/addcust1.png";
import img2 from "../../../assets/onbording/addcust2.png";
import img3 from "../../../assets/onbording/addcust3.png";
import IndexPointer from "./IndexPointer";

const PolicyManagement = () => {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      {/* Step 1 */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-3">
          <IndexPointer num={1} />
          <p>
            Go to the{" "}
            <a className="text-blue-600 font-medium hover:underline">
              CK-Tuner-Role
            </a>
            .
          </p>
        </div>
        <div className="border rounded-md overflow-hidden bg-gray-50">
          <img
            src={img1}
            alt="Add CustomManaged Policies"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-3">
          <IndexPointer num={2} />
          <p>
            In Permission policies, click on Add permissions {">"} Attach Policy
          </p>
        </div>
        <div className="border rounded-md overflow-hidden bg-gray-50">
          <img
            src={img2}
            alt="Add CustomManaged Policies"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-3">
          <IndexPointer num={3} />
          <p>
            Filter by Type {">"} Customer managed then search for
            cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
            cktuner-TunerReadEssentials and select them.
          </p>
        </div>
        <div className="border rounded-md overflow-hidden bg-gray-50">
          <img
            src={img3}
            alt="Add CustomManaged Policies"
            className="w-full object-contain"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <IndexPointer num={4} />
        <p>Now, click on Add permissions</p>
      </div>
    </div>
  );
};

export default PolicyManagement;
