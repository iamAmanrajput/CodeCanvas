import React from "react";
import { PulseLoader } from "react-spinners";

type LoaderProps = {
  size?: number;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 10, color = "#cbd5e1" }) => {
  return <PulseLoader size={size} color={color} />;
};

export default Loader;
