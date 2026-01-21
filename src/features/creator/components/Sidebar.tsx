import { FC } from "react";
import ProfileCard from "../../../shared/components/Profile_Card.tsx";
import { theme } from "../../../core/theme.js";

type MenuItem = {
  title: string;
  index: number;
};

type SidebarProps = {
  open: boolean;
  onclose: () => void;
  menus: MenuItem[];
  selectedMenuIndex: number;
  onMenuSelect: (index: number) => void;
};

const Sidebar: FC<SidebarProps> = ({ 
  open, 
  onclose, 
  menus, 
  selectedMenuIndex,
  onMenuSelect 
}) => {
  
  const handleProfilePress = () => {
     onMenuSelect(4); // Assuming EditProfile is index 4
  };

  return (
    <>
      {open && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden'
          onClick={onclose}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className='p-6 border-b border-gray-100'>
          <h1 className='text-xl font-bold'>PodFlow</h1>
          <p className='text-sm text-gray-500'>Admin Panel</p>
        </div>

        <nav className='p-4'>
          <ul className='space-y-2'>
            {menus.map((menu) => (
              <li key={menu.index}>
                <button
                  onClick={() => onMenuSelect(menu.index)}
                  style={{
                    color: selectedMenuIndex === menu.index 
                      ? theme.colors.primary 
                      : theme.colors.textcolor,
                    background: selectedMenuIndex === menu.index 
                      ? theme.colors.accent 
                      : "transparent",
                  }}
                  className='w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors'
                >
                  {menu.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Updated ProfileCard usage with custom props */}
        <div className="absolute bottom-0 w-full">
          <ProfileCard 
            title="My Account" 
            onPress={handleProfilePress}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;