import React from "react";
//lottie and lottie loader file
import Lottie from "react-lottie";
import animationData from "../assets/loaders/robotLoader.json";

interface LoaderProps extends React.HTMLProps<HTMLDivElement> {
  height: number;
  width: number;
}

const Loader = ({ height, width, ...restProps }: LoaderProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...restProps}
    >
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default Loader;
