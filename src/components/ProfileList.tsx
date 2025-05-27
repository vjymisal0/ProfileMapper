import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { Profile } from '../types';

interface ProfileListProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ 
  profiles, 
  selectedProfile,
  onSelectProfile,
  onViewDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4 space-y-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isSelected={selectedProfile?.id === profile.id}
              onSelect={onSelectProfile}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No profiles match your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;