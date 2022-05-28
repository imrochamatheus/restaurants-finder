import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/loader.json";

const Loader = () => {
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
        height={300}
        width={300}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

export default Loader;
