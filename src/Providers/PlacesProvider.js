import { createContext, useContext, useEffect, useState } from "react";
import { useMap } from "./MapProvider";

const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
  const { markers } = useMap();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(markers);
  }, [markers]);

  return (
    <PlacesContext.Provider value={{ places, setPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
export const usePlaces = () => useContext(PlacesContext);
