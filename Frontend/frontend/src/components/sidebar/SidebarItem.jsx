import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-blue-900"
        }`
      }
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}