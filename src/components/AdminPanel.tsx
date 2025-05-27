import React, { useState } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Profile } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  onUpdateProfiles: (profiles: Profile[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isOpen, 
  onClose, 
  profiles,
  onUpdateProfiles
}) => {
  const [loading, setLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleSave = async (profile: Profile) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const updatedProfiles = profiles.map(p => 
        p.id === profile.id ? profile : p
      );
      onUpdateProfiles(updatedProfiles);
      setEditingProfile(null);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (profileId: string) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const updatedProfiles = profiles.filter(p => p.id !== profileId);
      onUpdateProfiles(updatedProfiles);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <LoadingSpinner size={32} />
            </div>
          ) : (
            <div className="space-y-6">
              {profiles.map(profile => (
                <div key={profile.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{profile.name}</h3>
                        <p className="text-sm text-gray-500">{profile.address}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProfile(profile)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;