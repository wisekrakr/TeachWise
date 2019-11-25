import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toTheTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <Button onClick={toTheTop} id="top-btn" title="Go to top" style={btnStyle}>
      <i href="#top" className="fas fa-arrow-alt-circle-up fa-2x" />
    </Button>
  );
};

const btnStyle = {
  display: "none",
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  cursor: "pointer",
  borderRadius: "20px",
  padding: "0.2rem"
};

export default ScrollToTop;
