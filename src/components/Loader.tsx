import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/loaders/robotLoader.json";

const Loader = () => {
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
        height: "100vh",
        width: "100wh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loader;
