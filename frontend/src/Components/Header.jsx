import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as reduxLogout } from "../store/authSlice";

export default function Header({ collapsed = false, onToggleCollapse = () => {} }) {
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  const moduleItems = ["CK Lens", "CK Tuner"];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName
      ? user.firstName
      : user?.email || "User";

  const handleLogout = () => {
    dispatch(reduxLogout());
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <img src="/CKlogo.png" className="h-8 w-auto object-contain" alt="CK Logo" />

          <button
            onClick={onToggleCollapse}
            className="p-2 rounded hover:bg-gray-100 text-gray-600"
            title="Toggle Sidebar"
          >
            {!collapsed ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <div className="relative" ref={ddRef}>
            <div
              className="flex items-center gap-1 text-gray-700 text-sm cursor-pointer hover:text-gray-900"
              onClick={() => setOpen(prev => !prev)}
            >
              <span>Module</span>
              <svg
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
              >
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {open && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-md border border-gray-200 rounded z-50">
                {moduleItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      console.log("Selected:", item);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              {userName[0]?.toUpperCase()}
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Welcome</span>
              <span className="text-sm font-medium text-gray-800">{userName}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
