import { GOOGLE_API_KEY } from "../constants/google";

// static map
export const getStaticMapPreview = ({
  lat,
  lng,
  label,
  zoom = 14,
}: {
  lat: number;
  lng: number;
  label: string;
  zoom?: number;
}) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=400x200&maptype=roadmap&markers=color:red%7Clabel:${label}%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};
