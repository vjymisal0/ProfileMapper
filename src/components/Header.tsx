import React from 'react';
import { Map, Users, Settings2 } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Map className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Mapfolio</h1>
              <p className="text-xs text-gray-500">Interactive Profile Explorer</p>
            </div>
          </div>
          <button 
            onClick={onAdminClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-full
                     text-sm font-medium shadow-sm text-white bg-primary-600 
                     hover:bg-primary-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Settings2 className="mr-2 h-4 w-4" />
            Admin Panel
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;