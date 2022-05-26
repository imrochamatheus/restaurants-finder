import { InfoWindow } from "google-maps-react";

const Window = (props) => {
  console.log(props);
  return (
    <InfoWindow visible={props.selected} marker={props.clickedMarker}>
      <div>
        <h2>
          <span role="img" aria-label="bear">
            🐻
          </span>{" "}
          Alert
        </h2>
      </div>
    </InfoWindow>
  );
};

export default Window;
