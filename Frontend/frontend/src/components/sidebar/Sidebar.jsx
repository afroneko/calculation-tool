import { menuItems } from "./sidebarData";
import SidebarItem from "./SidebarItem";
import "../../styles/layout.css";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0B1B3A] text-white flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <h1 className="text-lg font-bold">Tummers</h1>
        <p className="text-xs text-gray-400">calculations</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-400">
        v1.0.0
      </div>
    </aside>
  );
}