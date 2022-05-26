import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";
import { useEffect } from "react";
import { useMap } from "../../Providers/MapProvider";
import Window from "../Window";

const mapContainer = {
  width: "400px",
  height: "400px",
};

const MapContainer = (props) => {
  const { map, markers, setGoogle, searchByNear } = useMap();

  const [clickedMarker, setClickedMarker] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  const handleMarkerClick = (place, marker) => {
    setClickedMarker(marker);
    setCurrentPlace(place);
    setSelected(true);
  };

  return (
    <Map
      zoom={18}
      google={props.google}
      onReady={searchByNear}
      onRecenter={searchByNear}
      containerStyle={mapContainer}
      centerAroundCurrentLocation
    >
      {markers &&
        markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            title={marker.name}
            onClick={handleMarkerClick}
          />
        ))}
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
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
