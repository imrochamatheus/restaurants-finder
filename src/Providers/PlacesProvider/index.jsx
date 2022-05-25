import { useCallback, useContext, useState } from "react";
import { createContext } from "react";

const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState(null);

  const searchByNear = useCallback((map, center, radius = 300, query) => {
    const request = {
      radius,
      location: center,
      ...(query || { type: ["restaurant"] }),
      // type: ["restaurant"],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  }, []);

  return (
    <PlacesContext.Provider value={{ places, setPlaces, searchByNear }}>
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
export const usePlaces = () => useContext(PlacesContext);
