import React from 'react';
import { X, Mail, Phone, Linkedin, Tag } from 'lucide-react';
import { Profile } from '../types';

interface ProfileDetailsProps {
  profile: Profile;
  onClose: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8 relative overflow-hidden transform transition-all max-h-[80vh]">
        <div className="relative flex flex-col items-center justify-center p-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-auto max-w-xs max-h-48 object-contain rounded-xl border border-gray-200 shadow"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full 
                     hover:bg-gray-200 transition-all duration-300 text-gray-700 shadow"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
          <div className="w-full mt-3 text-center">
            <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Tag size={16} />
              <span>{profile.skills?.[0]}</span>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-60">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">{profile.description}</p>
          </div>

          {profile.contact && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.contact.email && (
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 
                             hover:bg-gray-100 transition-colors group"
                  >
                    <Mail size={20} className="text-blue-500" />
                    <span className="text-gray-600 group-hover:text-gray-900">{profile.contact.email}</span>
                  </a>
                )}
                {profile.contact.phone && (
                  <a
                    href={`tel:${profile.contact.phone}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 
                             hover:bg-gray-100 transition-colors group"
                  >
                    <Phone size={20} className="text-green-500" />
                    <span className="text-gray-600 group-hover:text-gray-900">{profile.contact.phone}</span>
                  </a>
                )}
                {profile.contact.linkedin && (
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 
                             hover:bg-gray-100 transition-colors group"
                  >
                    <Linkedin size={20} className="text-blue-600" />
                    <span className="text-gray-600 group-hover:text-gray-900">LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm 
                             flex items-center hover:bg-blue-100 transition-colors"
                  >
                    <Tag size={14} className="mr-2 opacity-70" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm 
                             hover:bg-gray-100 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;