import { useCallback, useState } from "react";
import { useMap } from "../../Providers/MapProvider";
import { usePlaces } from "../../Providers/PlacesProvider";
import { GoogleMap, Marker } from "@react-google-maps/api";

const container = {
  width: "400px",
  height: "400px",
};

const Map = () => {
  const { places, setPlaces, searchByNear } = usePlaces();
  const { userPosition, isLoaded, loadError } = useMap();

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds(userPosition);
      map.fitBounds(bounds);
      searchByNear(map, userPosition);
    },
    [userPosition, searchByNear]
  );

  return !loadError ? (
    isLoaded ? (
      userPosition && (
        <GoogleMap mapContainerStyle={container} onLoad={onLoad}>
          <Marker position={userPosition} />
          {places &&
            places.map((place) => (
              <Marker
                key={place.place_id}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
              />
            ))}
        </GoogleMap>
      )
    ) : (
      <h4>Loader...</h4>
    )
  ) : (
    <h1>O mapa não pôde ser carregado</h1>
  );
};

export default Map;
