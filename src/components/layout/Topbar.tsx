import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="z-10 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-6">
        {/* Left: Mobile menu button and search */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-1 mr-4 -ml-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 border-0 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right: User menu, notifications */}
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-500 transition-colors duration-200 rounded-full hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;