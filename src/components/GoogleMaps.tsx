import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
  Libraries,
} from "@react-google-maps/api";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  MutableRefObject,
} from "react";

interface GoogleMapsProps {
  radius: number;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  style: React.CSSProperties;
  address: string;
  setAddress: (address: string) => void;
  latitude: number;
  longitude: number;
}

const libraries = ["places"];

const GoogleMaps: React.FC<GoogleMapsProps> = ({
  radius,
  setLatitude,
  setLongitude,
  style,
  address,
  setAddress,
  latitude,
  longitude,
}) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(
    null
  ) as MutableRefObject<google.maps.places.SearchBox | null>;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as Libraries,
  });

  const center = useMemo(() => {
    return {
      lat: latitude,
      lng: longitude,
    };
  }, [latitude, longitude]);

  const changeCoordinate = (coord: google.maps.MapMouseEvent) => {
    if (coord.latLng) {
      const lat = coord.latLng.lat();
      const lng = coord.latLng.lng();
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  useEffect(() => {
    if (map) {
      map.panTo({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [latitude, longitude, map]);

  const handlePlaceChanged = () => {
    const places = inputRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setAddress(place.formatted_address || "");
      setLatitude(place.geometry?.location?.lat() || 0);
      setLongitude(place.geometry?.location?.lng() || 0);
    }
  };

  return (
    <div className="w-full h-96">
      {!isLoaded ? (
        <p>Loading.....</p>
      ) : (
        <GoogleMap
          mapContainerStyle={style}
          zoom={10}
          center={center}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <div className="relative ml-48 mt-[10px] w-[500px]">
              <input
                type="text"
                className={`form-control text-black rounded-full bg-white ${style}`}
                value={address}
                placeholder="Search for location"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </StandaloneSearchBox>
          <button>
            <span className="z-50 flex justify-center items-center w-10 h-10 text-white bg-blue-500 rounded-full transition duration-75">
              Click me!
            </span>
          </button>
          <Marker
            position={{
              lat: latitude,
              lng: longitude,
            }}
            draggable
            onDragEnd={changeCoordinate}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMaps;
