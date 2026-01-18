// shared/components/SideMenu.tsx
import React from "react";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
}

interface SideMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen = true, onClose }) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "creators", label: "Creators", icon: "🎨" },
    { id: "content", label: "Content", icon: "📁" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen
        w-64
      `}>
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">PodFlow</h1>
          <p className="text-sm text-gray-500">Admin Portal</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg
                    text-left transition-colors
                    ${item.id === "dashboard" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => console.log(`Navigate to ${item.id}`)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">A</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">Admin User</p>
              <p className="text-sm text-gray-500">admin@podflow.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;