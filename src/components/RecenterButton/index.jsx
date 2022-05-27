function RecenterButton({ panTo }) {
  return (
    <button
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "0.5rem",
        width: "4rem",
        background: "none",
        border: "none",
        zIndex: "10",
      }}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

export default RecenterButton;
