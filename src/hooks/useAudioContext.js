import { useState, useEffect } from "react";
// hooks/useResponsive.js
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState("mobile");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) setScreenSize("desktop");
      else if (window.innerWidth >= 768) setScreenSize("tablet");
      else setScreenSize("mobile");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};
