import { useLocation } from "react-router-dom";

export const urlDataGet = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
