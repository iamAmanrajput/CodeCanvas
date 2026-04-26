import { colors } from "@/constants/colors";

export const generateColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
