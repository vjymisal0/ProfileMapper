import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import ProfileList from './components/ProfileList';
import MapView from './components/MapView';
import AdminPanel from './components/AdminPanel';
import ProfileDetails from './components/ProfileDetails';
import ErrorFallback from './components/ErrorBoundary';
import { profiles as initialProfiles } from './data/profiles';
import { Profile, AdminState } from './types';

function App() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [detailProfile, setDetailProfile] = useState<Profile | null>(null);
  const [adminState, setAdminState] = useState<AdminState>({
    isOpen: false,
    editingProfile: null
  });
  
  const handleAdminOpen = () => {
    setAdminState(prev => ({ ...prev, isOpen: true }));
  };

  const handleAdminClose = () => {
    setAdminState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onAdminClick={handleAdminOpen} />
      
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <div className="w-full md:w-2/5 lg:w-1/3 border-r border-gray-200 overflow-auto">
            <ProfileList 
              profiles={profiles} 
              selectedProfile={selectedProfile}
              onSelectProfile={setSelectedProfile}
              onViewDetails={setDetailProfile}
            />
          </div>
          
          <div className="w-full md:w-3/5 lg:w-2/3 h-[300px] md:h-auto">
            <MapView 
              selectedProfile={selectedProfile}
              profiles={profiles}
            />
          </div>
        </ErrorBoundary>
      </main>

      <AdminPanel
        isOpen={adminState.isOpen}
        onClose={handleAdminClose}
        profiles={profiles}
        onUpdateProfiles={setProfiles}
      />

      {detailProfile && (
        <ProfileDetails
          profile={detailProfile}
          onClose={() => setDetailProfile(null)}
        />
      )}
    </div>
  );
}

export default App;