import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, UserCircle, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Admins', path: '/admins', icon: <UserCircle size={20} /> },
    { name: 'Candidates', path: '/candidates', icon: <Users size={20} /> },
    { name: 'Companies', path: '/companies', icon: <Briefcase size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-md">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">Admin Panel</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col h-full py-4">
          <div className="flex-1">
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout button */}
          <div className="px-4 mt-auto">
            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 rounded-md hover:bg-gray-100">
              <LogOut size={20} className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;