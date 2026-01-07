import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Sidebar({ selected, collapsed = false }) {

  const { user } = useAuth();
  const role = user?.role;

  const navigate = useNavigate();

  const menu = [
    ...(role !== "CUSTOMER"
      ? [
        { id: "users", label: "Users", icon: "👥", path: "/users" },
        {
          id: "onboarding",
          label: "Client Onboarding",
          icon: "🚀",
          path: "/onboarding",
        },
      ]
      : []),

    { id: "partner", label: "Partner Management", icon: "🤝" },
    { id: "dashboard", label: "Dashboard Control Grid", icon: "📊" },
    { id: "module", label: "Module Control Grid", icon: "⚙️" },
    { id: "tags", label: "Tags", icon: "🏷️" },
    { id: "permission", label: "Permission Group", icon: "🔐" },
  ];

  const containerClasses = collapsed ? "w-20" : "w-56";

  return (
    <aside className={`${containerClasses} bg-gray-50 border-r border-gray-200 flex flex-col transition-width duration-200 ease-in-out`}>
      
      <nav className="flex-1 overflow-auto">
        {menu.map((item) => {
          const active = item.id === selected;

          if (collapsed) {
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect && onSelect(item.id)}
                onKeyDown={(e) => e.key === "Enter" && onSelect && onSelect(item.id)}
                className={`flex items-center justify-center py-3 cursor-pointer text-sm ${
                  active ? "bg-white text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
                title={item.label}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => item.path && navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm ${
              active
              ? "bg-white text-blue-700 border-l-4 border-blue-600 font-medium shadow-sm"
              : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
      
    </aside>
  );
}


