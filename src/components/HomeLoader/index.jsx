import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/home-loader.json";

const HomeLoader = ({ height, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ marginTop: "25%" }}>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

export default HomeLoader;
