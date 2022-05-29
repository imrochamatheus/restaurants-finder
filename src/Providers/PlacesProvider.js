import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMap } from "./MapProvider";

const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
  const { markers, map } = useMap();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(markers);
  }, [markers]);

  const getDetails = useCallback(
    (place, callback, i) => {
      const request = {
        placeId: place.place_id,
        fields: [
          "name",
          "rating",
          "user_ratings_total",
          "formatted_phone_number",
          "geometry",
          "opening_hours",
          "photo",
          "reviews",
          "formatted_address",
        ],
      };

      setTimeout(() => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails(request, (response, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            callback(response);
          }
        });
      }, i * 500);
    },
    [map]
  );

  return (
    <PlacesContext.Provider value={{ places, setPlaces, getDetails }}>
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
export const usePlaces = () => useContext(PlacesContext);
