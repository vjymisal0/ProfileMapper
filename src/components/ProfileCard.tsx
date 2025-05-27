import React from 'react';
import { MapPin, Info, Briefcase, MapPinned } from 'lucide-react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  isSelected: boolean;
  onSelect: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isSelected, 
  onSelect,
  onViewDetails
}) => {
  return (
    <div 
      className={`
        profile-card bg-white rounded-xl shadow-soft overflow-hidden
        ${isSelected ? 'ring-2 ring-primary-500 scale-[1.02]' : ''}
      `}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img 
            className="w-full h-full object-cover" 
            src={profile.photo} 
            alt={profile.name} 
          />
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 flex items-center">
              <Briefcase className="w-3 h-3 mr-1" />
              {profile.skills?.[0]}
            </span>
          </div>
        </div>
        <div className="p-4 md:w-2/3">
          <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
          
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">{profile.description}</p>
          
          <div className="mt-3 flex items-center text-gray-500 text-sm">
            <MapPinned size={16} className="mr-1 text-primary-500" />
            <span className="truncate">{profile.address}</span>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onSelect(profile)}
              className={`
                px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex-1
                flex items-center justify-center space-x-2
                ${isSelected 
                  ? 'bg-primary-50 text-primary-700 hover:bg-primary-100' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
              `}
            >
              <MapPin size={16} />
              <span>{isSelected ? 'Viewing' : 'View Location'}</span>
            </button>
            <button
              onClick={() => onViewDetails(profile)}
              className="px-4 py-2 rounded-full font-medium text-sm bg-gray-50 text-gray-700 
                       hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
            >
              <Info size={16} />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;