import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({ selected }) {
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const role = user?.role;

  const collapsed = useSelector(state => state.layout.sidebarCollapsed);


  if (!role) return null; // ⬅ prevents flicker

  const menuItems = [
    {
      key: "users",
      label: "Users",
      icon: "👥",
      path: "/users",
      roles: ["ADMIN", "READ_ONLY"],
    },
    {
      key: "onboarding",
      label: "Client Onboarding",
      icon: "🚀",
      path: "/client-onboarding",
      roles: ["ADMIN", "READ_ONLY"],
    },
    {
      key: "cost-explorer",
      label: "Cost Explorer",
      icon: "📊",
      path: "/cost-explorer",
      roles: ["ADMIN", "READ_ONLY", "CUSTOMER"],
    },
    {
      key: "aws-services",
      label: "AWS Services",
      icon: "☁️",
      path: "/aws-services",
      roles: ["ADMIN", "READ_ONLY", "CUSTOMER"],
    },
  ];

  const visibleItems = menuItems.filter(item =>
    item.roles.includes(role)
  );

  return (
    <aside
      className={`bg-white border border-gray-200 rounded-md p-3 h-[calc(100vh-197px)] ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <nav className="space-y-1">
        {visibleItems.map(item => (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition ${
              selected === item.key
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
