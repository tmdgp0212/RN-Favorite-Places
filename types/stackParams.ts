import { LatLng } from "react-native-maps";

export type RootStackParams = {
  AllPlaces: undefined;
  AddPlace: {
    pickedLocation?: LatLng;
  };
  Map: {
    coordinate?: LatLng;
  };
};
