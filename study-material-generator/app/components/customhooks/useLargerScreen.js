import { useState, useEffect } from "react";

// Custom hook to determine if the screen is large
const useLargeScreen = (breakpoint = 768) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isLargeScreen;
};

export default useLargeScreen;
