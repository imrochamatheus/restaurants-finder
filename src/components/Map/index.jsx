import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
  Circle,
} from "google-maps-react";

import { useCallback } from "react";
import { useEffect } from "react";
import { useMap } from "../../Providers/MapProvider";
import { useDirections } from "../../Providers/DirectionsProvider";

import foodImage from "../../assets/img/food-icon.png";
import { usePlaces } from "../../Providers/PlacesProvider";
import { useMarkers } from "../../Providers/MarkersProvider";

import ClearRouteButton from "../ClearRouteButton";

const MapContainer = (props) => {
  const { range, markers, setGoogle, searchByNear, userPosition } = useMap();
  const { route, setDestiny } = useDirections();
  const { foodMarker, userMarker } = useMarkers();

  const {
    clickedMarker,
    setClickedMarker,
    currentPlace,
    setCurrentPlace,
    selected,
    setSelected,
  } = usePlaces();

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  const handleMarkerClick = useCallback(
    (_, marker) => {
      setDestiny(marker.internalPosition);
      setCurrentPlace(marker.infos);
      setClickedMarker(marker);
      setSelected(true);
    },
    [setDestiny, setClickedMarker, setCurrentPlace, setSelected]
  );

  return (
    <Map
      zoom={16}
      google={props.google}
      onReady={searchByNear}
      onRecenter={searchByNear}
      center={userPosition}
      centerAroundCurrentLocation
      containerStyle={{
        height: "93.2vh",
      }}
    >
      <Marker
        position={userPosition}
        icon={userMarker}
        animation={window.google.maps.Animation.BOUNCE}
      />

      {markers &&
        markers.map((marker, i) => (
          <Marker
            key={i}
            icon={foodMarker}
            title={marker.name}
            infos={marker}
            position={marker.position}
            onClick={handleMarkerClick}
          />
        ))}
      {/* <ClearRouteButton /> */}
      {userPosition && (
        <Circle
          radius={range}
          center={userPosition}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="green"
          fillOpacity={0.05}
        />
      )}

      <InfoWindow
        visible={selected}
        marker={clickedMarker}
        onClose={() => {
          setSelected(false);
        }}
        style={{ background: "blue" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={foodImage} alt="food icon" width="100px" height="100px" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h2 style={{ fontSize: "16px" }}>{currentPlace?.name}</h2>
            <p style={{ fontSize: "12px" }}>
              {currentPlace?.vicinity || currentPlace?.formatted_address}
            </p>
          </div>
        </div>
      </InfoWindow>

      {route && (
        <Polyline
          path={route}
          geodesic={false}
          options={{
            strokeColor: "blue",
            strokeOpacity: 0.5,
            strokeWeight: 3,
          }}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
