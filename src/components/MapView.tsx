import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import type { MapViewState, Profile } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm9sdHRlbXAiLCJhIjoiY2x2a21kczdiMDY5ZjJscWlvNzBjanJrYyJ9.YyJ0Ax8z1YYgsHfmQJDUgA';

interface MapViewProps {
  selectedProfile: Profile | null;
  profiles: Profile[];
}

const MapView: React.FC<MapViewProps> = ({ selectedProfile, profiles }) => {
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3
  });

  const [popupInfo, setPopupInfo] = useState<Profile | null>(null);

  useEffect(() => {
    if (selectedProfile) {
      setViewState({
        longitude: selectedProfile.coordinates.longitude,
        latitude: selectedProfile.coordinates.latitude,
        zoom: 12
      });
      setPopupInfo(selectedProfile);
    }
  }, [selectedProfile]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        className="h-full w-full"
      >
        <NavigationControl position="top-right" />

        {profiles.map(profile => (
          <Marker
            key={profile.id}
            longitude={profile.coordinates.longitude}
            latitude={profile.coordinates.latitude}
            anchor="center"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(profile);
            }}
          >
            <div className={`
              transform transition-all duration-300 cursor-pointer
              ${selectedProfile?.id === profile.id
                ? 'scale-150 -translate-y-2'
                : 'hover:scale-125 hover:-translate-y-1'
              }
            `}>
              <div className={`
                relative p-2 rounded-full
                ${selectedProfile?.id === profile.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                }
                shadow-lg transition-all duration-300
              `}>
                <MapPin size={20} />
              </div>
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.coordinates.longitude}
            latitude={popupInfo.coordinates.latitude}
            anchor="bottom"
            offset={20}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="rounded-xl overflow-hidden"
          >
            <div className="p-3 min-w-[240px]">
              <div className="flex items-center space-x-3">
                <img
                  src={popupInfo.photo}
                  alt={popupInfo.name}
                  className="w-16 h-16 rounded-lg object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{popupInfo.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{popupInfo.address}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600 line-clamp-2">{popupInfo.description}</p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapView;