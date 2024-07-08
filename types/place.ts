import { LatLng } from "react-native-maps";

export interface PlaceType {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
}

export interface Location extends LatLng {
  address: string;
}
