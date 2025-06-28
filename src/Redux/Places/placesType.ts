export interface Place {
  id: string;
  name: string;
  [key: string]: any;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlacesState {
  autocompleteResults: Place[];
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}
