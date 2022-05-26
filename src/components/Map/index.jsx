import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";
import { useEffect } from "react";

import { useMap } from "../../Providers/MapProvider";

const MapContainer = (props) => {
  const { map, markers, setGoogle, searchByNear } = useMap();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setGoogle(props.google);
  }, [setGoogle, props.google]);

  return (
    <Map
      zoom={18}
      google={props.google}
      onReady={searchByNear}
      onRecenter={searchByNear}
      centerAroundCurrentLocation
    >
      {markers &&
        markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            title={marker.name}
            onClick={() => setSelected(true)}
          >
            {selected && (
              <InfoWindow
                position={marker.position}
                onClose={() => setSelected(false)}
              >
                <div>
                  <h2>
                    <span role="img" aria-label="bear">
                      🐻
                    </span>{" "}
                    Alert
                  </h2>
                  <p>Foda-se. Texto aleatório</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt-BR",
})(MapContainer);
