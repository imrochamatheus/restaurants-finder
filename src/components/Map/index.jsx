import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Circle } from "google-maps-react";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useMap } from "../../Providers/MapProvider";

import foodIcon from "../../assets/img/foodMarker.png";
import userIcon from "../../assets/img/here-icon.png";
import { Box } from "@mui/system";

const mapContainer = {
  width: "inherit",
};

const MapContainer = (props) => {
  const { markers, setGoogle, searchByNear, userPosition } = useMap();

  const [clickedMarker, setClickedMarker] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  let foodMarker = useMemo(
    () =>
      new window.google.maps.MarkerImage(
        foodIcon,
        null,
        null,
        null,
        new window.google.maps.Size(35, 50)
      ),
    []
  );

  let userMarker = useMemo(
    () =>
      new window.google.maps.MarkerImage(
        userIcon,
        null,
        null,
        null,
        new window.google.maps.Size(100, 100)
      ),
    []
  );

  const handleMarkerClick = (place, marker) => {
    setClickedMarker(marker);
    setCurrentPlace(place);
    setSelected(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Map
        zoom={15}
        google={props.google}
        onReady={searchByNear}
        onRecenter={searchByNear}
        containerStyle={mapContainer}
        centerAroundCurrentLocation
        center={userPosition}
      >
        <Marker position={userPosition} icon={userMarker} animation />

        {markers &&
          markers.map((marker, i) => (
            <Marker
              key={i}
              icon={foodMarker}
              title={marker.name}
              position={marker.position}
              onClick={handleMarkerClick}
            />
          ))}

        {userPosition && (
          <Circle
            radius={2000}
            center={userPosition}
            // onMouseover={() => console.log("mouseover")}
            // onClick={() => console.log("click")}
            // onMouseout={() => console.log("mouseout")}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor="#FF0000"
            fillOpacity={0.08}
          />
        )}

        <InfoWindow visible={selected} marker={clickedMarker}>
          <div>
            <h2 style={{ fontSize: "24px" }}>
              <span role="img" aria-label="bear">
                🐻
              </span>

              {currentPlace?.title}
            </h2>
          </div>
        </InfoWindow>
      </Map>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
