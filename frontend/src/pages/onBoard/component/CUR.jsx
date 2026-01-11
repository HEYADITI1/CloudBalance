import React from "react";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import img1 from "../../../assets/onbording/cur1.png";
import img2 from "../../../assets/onbording/cur2.png";
import img3 from "../../../assets/onbording/cur3.png";
import IndexPointer from "./IndexPointer";
import { toast } from "react-toastify";

const resourceID = `ck-tuner-275595855473-hourly-cur`;
const rolePath = `275595855473`;
const CUR = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("text copied")
  };

  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      <div className="flex gap-3">
        <IndexPointer num={1} />
        <p>
          Go to{" "}
          <a className="text-blue-600 font-medium hover:underline">
            Cost and Usage Reports
          </a>{" "}
          in the Billing Dashboard and click on Create report.
        </p>
      </div>

      <div className="flex gap-3">
        <IndexPointer num={2} />
        <p>
          Name the report as shown below and select the{" "}
          <b>Include resource IDs</b> checkbox -
        </p>
      </div>

      {/* Code block */}
      <div className="relative bg-gray-50 border rounded-md p-1 text-sm font-mono max-w-sm group cursor-pointer">
        <button
          onClick={() => copyToClipboard(resourceID)}
          className="absolute right-3 rounded  group-hover:text-blue-800 cursor-pointer"
        >
          <ContentCopyTwoToneIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-800" />
        </button>

        <pre className="whitespace-pre-wrap text-blue-400 group-hover:bg-blue-50 hover:text-blue-800">
          {resourceID}
        </pre>
      </div>

      <p>Ensure that the following configuration is checked</p>
      <div>
        <input type="checkbox" value={true} onClick={(e)=>{e.target.value = !e.target.value}} /> <b>Include resource IDs</b>
      </div>

      <p>
        Click on <b>Next</b>
      </p>

      <div className="border rounded-md overflow-hidden bg-gray-50">
        <img
          src={img1}
          alt="Create Cost & Usage Report"
          className="w-full object-contain"
        />
      </div>

      <div className="flex gap-3">
        <IndexPointer num={3} />
        <p>
          In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket that
          was created -
        </p>
      </div>
      <p>Ensure that the following configuration is checked</p>
      <div>
        <input type="checkbox" value={true} onClick={(e)=>{e.target.value = !e.target.value}} />{" "}
        <b>The following default policy will be applied to your bucket</b>
      </div>
      <p>
        Click on <b>Save</b>
      </p>
      <div className="border rounded-md overflow-hidden bg-gray-50">
        <img
          src={img2}
          alt="Create Cost & Usage Report"
          className="w-full object-contain"
        />
      </div>

      <div className="flex gap-3">
        <IndexPointer num={4} />
        <p>
          In the <i>Delivery options</i> section, enter the below-mentioned
          Report path prefix -
        </p>
      </div>
      <p>Report path prefix:</p>

      <div className="relative max-w-fit p-1 group cursor-pointer">
        <input
          value={rolePath}
          readOnly
          className="w-full border rounded-md px-3 py-1 bg-gray-50 group-hover:text-blue-800 cursor-pointer"
        />
        <button
          onClick={() => copyToClipboard(rolePath)}
          className="absolute right-3  rounded group-hover:text-blue-800 cursor-pointer"
        >
          <ContentCopyTwoToneIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-800" />
        </button>
      </div>

      <p>Additionally, ensure that the following checks are in place</p>
      <p>Time granularity:</p>

      <div>
        <input type="radio" checked /> <b>Hourly</b>
      </div>

      <p>
        Please make sure these checks are Enabled in Enable report data
        integration for:Please make sure these checks are Enabled in Enable
        report data integration for:
      </p>

      <div>
        <input type="checkbox" value={true} onClick={(e)=>{e.target.value = !e.target.value}}/>
        <b> Amazon Athena</b>
      </div>
      <div className=" rounded-md overflow-hidden bg-gray-50">
        <img
          src={img3}
          alt="Create Cost & Usage Report"
          className="w-full object-contain"
        />
      </div>

      <div className="flex gap-3">
        <IndexPointer num={5} />
        <p>
          Click on <b>Next</b>. Now, review the configuration of the Cost and
          Usage Report. Once satisfied, click on <b>Create Report</b>.
        </p>
      </div>
    </div>
  );
};

export default CUR;
