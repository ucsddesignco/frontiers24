import { useEffect, useState } from "react";
import styles from "../styles/export.module.scss";

export default function useIsDesktop() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileBreakpoint = Number(styles.mobileBreakpoint.replace("px", ""));

  return windowWidth > mobileBreakpoint;
}
