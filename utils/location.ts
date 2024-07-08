import { LatLng } from "react-native-maps";
import { GOOGLE_API_KEY } from "../constants/google";

// static map
export const getStaticMapPreview = ({
  latitude,
  longitude,
  label = "",
}: {
  latitude: number;
  longitude: number;
  label?: string;
}) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:${label}%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
};

export const getAddress = async ({ latitude, longitude }: LatLng) => {
  const res =
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${GOOGLE_API_KEY}
  `);

  if (res.ok) {
    const data = await res.json();
    const address: string = data.results[0].formatted_address;

    return address;
  } else {
    throw new Error("주소를 찾을 수 없습니다.");
  }
};
