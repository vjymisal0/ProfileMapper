import React, { useState } from 'react';
import { X, Save, Trash2, Plus, Edit2 } from 'lucide-react';
import { Profile } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  onUpdateProfiles: (profiles: Profile[]) => void;
}

interface ProfileFormData {
  name: string;
  description: string;
  photo: string;
  address: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  contact: {
    email: string;
    phone: string;
    linkedin?: string;
  };
  skills: string[];
  interests: string[];
}

const emptyProfile: ProfileFormData = {
  name: '',
  description: '',
  photo: '',
  address: '',
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  contact: {
    email: '',
    phone: '',
    linkedin: '',
  },
  skills: [],
  interests: [],
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  profiles,
  onUpdateProfiles
}) => {
  const [loading, setLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(emptyProfile);

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      description: profile.description,
      photo: profile.photo,
      address: profile.address,
      coordinates: profile.coordinates,
      contact: profile.contact || emptyProfile.contact,
      skills: profile.skills || [],
      interests: profile.interests || [],
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingProfile(null);
    setFormData(emptyProfile);
    setIsCreating(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const profileData = {
        id: editingProfile?.id || crypto.randomUUID(),
        ...formData,
      };

      let updatedProfiles;
      if (isCreating) {
        updatedProfiles = [...profiles, profileData];
      } else {
        updatedProfiles = profiles.map(p =>
          p.id === profileData.id ? profileData : p
        );
      }

      onUpdateProfiles(updatedProfiles);
      setEditingProfile(null);
      setIsCreating(false);
      setFormData(emptyProfile);
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
      const updatedProfiles = profiles.filter(p => p.id !== profileId);
      onUpdateProfiles(updatedProfiles);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[] | object) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl m-4 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Profile</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <LoadingSpinner size={32} />
            </div>
          ) : (
            <div className="space-y-6">
              {(isCreating || editingProfile) ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                      <input
                        type="text"
                        value={formData.photo}
                        onChange={(e) => handleInputChange('photo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                      <input
                        type="number"
                        value={formData.coordinates.longitude}
                        onChange={(e) => handleInputChange('coordinates', {
                          ...formData.coordinates,
                          longitude: parseFloat(e.target.value)
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                      <input
                        type="number"
                        value={formData.coordinates.latitude}
                        onChange={(e) => handleInputChange('coordinates', {
                          ...formData.coordinates,
                          latitude: parseFloat(e.target.value)
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.contact.email}
                          onChange={(e) => handleInputChange('contact', {
                            ...formData.contact,
                            email: e.target.value
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={formData.contact.phone}
                          onChange={(e) => handleInputChange('contact', {
                            ...formData.contact,
                            phone: e.target.value
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                          type="url"
                          value={formData.contact.linkedin}
                          onChange={(e) => handleInputChange('contact', {
                            ...formData.contact,
                            linkedin: e.target.value
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.skills.join(', ')}
                      onChange={(e) => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interests (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.interests.join(', ')}
                      onChange={(e) => handleInputChange('interests', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => {
                        setEditingProfile(null);
                        setIsCreating(false);
                        setFormData(emptyProfile);
                      }}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                               transition-colors flex items-center space-x-2"
                    >
                      <Save size={18} />
                      <span>Save Profile</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profiles.map(profile => (
                    <div key={profile.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{profile.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(profile)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit profile"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(profile.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete profile"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;