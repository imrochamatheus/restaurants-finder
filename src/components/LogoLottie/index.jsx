import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/ifoodLottie.json";

const LogoLottie = ({ height, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
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

export default LogoLottie;
