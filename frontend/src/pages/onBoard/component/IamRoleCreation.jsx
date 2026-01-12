import React, { useState } from "react";
import IndexPointer from "./IndexPointer.jsx";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { Data } from "./CustomerTrustPolicy.js";
import img from "../../../assets/onbording/createiam.png";
import Input from "./Input.jsx"
import { toast } from "react-toastify";

const IamRoleCreation = ({account, setAccount}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("text copied")
  };

  const handleChange =(e) =>{
    const {name, value} = e.target;
    setAccount({
      ...account,
      [name]: value,
    })    
  }

  return (
    <div id="accountCreation">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Create an IAM Role</h1>
        <h3 className="text-sm">Create an IAM Role by following these steps</h3>
        <div className="border rounded-xl p-7.5 bg-white shadow-2xl flex flex-col gap-5 p">
          {/* point 1 */}
          <div className="flex gap-4">
            <IndexPointer num={1} />
            <p className="flex">
              Log into AWS account & &nbsp; Create an IAM Role.
            </p>
          </div>
          {/* point 2 */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <IndexPointer num={2} />
              In theTrusted entity typesection, selectCustom trust
              policy.Replace the prefilled policy with the policy provided below-
            </div>

            <div className=" ">
              <pre className="border flex text-sm text-[#6366f1] border-black/20 p-2 rounded-2xl h-50 overflow-auto relative justify-between">
                {Data}
                <button onClick={()=>copyToClipboard(Data)} className="border sticky top-0 right-0 border-black/20 h-fit p-1 rounded-md hover:bg-[#6366f1] hover:text-white">
                  <ContentCopyTwoToneIcon className=" rounded-md transition delay-50 ease-in-out " />
                </button>
              </pre>
            </div>

            {/* point 3 */}
            <div className="flex gap-4">
              <IndexPointer num={3} />
              <p>
                Click on <b>Next</b> to go to the <i>Add permissions page</i>.
                We would not be adding any permissions for now. Click on{" "}
                <b>Next</b>.
              </p>
            </div>

            {/* point 4 */}
            <div className="flex gap-4">
              <IndexPointer num={4} />
              <p>
                In the <i>Role name</i> field, enter the below-mentioned role
                name and click on <b>Create Role -</b>
              </p>
            </div>
            <div className="relative max-w-md ">
              <input
                value="CK-Tuner-Role-dev2"
                readOnly
                className="w-full border border-black/20 rounded-md px-3 py-2 pr-10 text-[#6366f1] bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard("CK-Tuner-Role-dev2")}
                className="absolute right-2 p-1.5 rounded"
                title="Copy role name"
              >
                <div className="border border-black/20 h-fit p-1 rounded-md text-[#6366f1] hover:bg-[#6366f1] hover:text-white">
                  <ContentCopyTwoToneIcon className=" rounded-md transition delay-50 ease-in-out " />
                </div>
              </button>
            </div>

            {/* point 5 */}
            <div className="flex gap-3">
              <IndexPointer num={5} />
              <p>
                Go to the newly created IAM Role and copy the <b>Role ARN</b> –
              </p>
            </div>

            <div className="border rounded-md overflow-hidden bg-gray-50">
              <img
                src={img}
                alt="IAM Role ARN Screenshot"
                className="w-full object-contain"
              />
            </div>

            {/* point 6 */}
            <div className="flex gap-3 items-center">
              <IndexPointer num={6} />
              <b className="text-lg">Paste the copied Role ARN below-</b>
            </div>
            <div className="flex gap-6 ">
              <Input 
                label="IAM Role ARN"
                type="text"
                name="arn"
                placeholder="Paste ARN"
                value={account.arn}
                onChange={handleChange}
              />
              <Input 
                label="Account ID"
                type="text"
                name="accountId"
                placeholder="Enter Account ID"
                value={account.accountId}
                onChange={handleChange}
                readOnly={false}
              />
            </div>
            <Input 
              label="Account Name"
              type="text"
              name="accountName"
              placeholder="Enter Account Name"
              value={account.accountName}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IamRoleCreation;
