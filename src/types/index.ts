export interface Profile {
  id: string;
  name: string;
  description: string;
  photo: string;
  address: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  contact?: {
    email: string;
    phone: string;
    linkedin?: string;
  };
  interests?: string[];
  skills?: string[];
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface MapMarker {
  id: string;
  longitude: number;
  latitude: number;
  profileId: string;
}

export interface AdminState {
  isOpen: boolean;
  editingProfile: Profile | null;
}