import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="border-white p-20 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center text-center max-w-md">
            {/* Icon */}
            <div
              className="w-20 h-20 bg-blue-50 flex items-center justify-center mb-5"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              <ShieldAlert className="w-9 h-9 text-blue-600 translate-y-2" />
            </div>

            {/* Message */}
            <p className="text-2xl text-gray-600 mb-4">
              You are not authorized to access this page.
            </p>

            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="text-2xl text-blue-600 hover:underline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
