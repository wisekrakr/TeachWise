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
    <Button
      color="dark"
      onClick={toTheTop}
      id="top-btn"
      title="Go to top"
      style={btnStyle}
    >
      <i href="#top" className="fas fa-arrow-alt-circle-up fa-2x" />
    </Button>
  );
};

const btnStyle = {
  display: "none" /* Hidden by default */,
  position: "fixed" /* Fixed/sticky position */,
  bottom: "1rem" /* Place the button at the bottom of the page */,
  right: "1rem" /* Place the button 30px from the right */,
  cursor: "pointer" /* Add a mouse pointer on hover */,
  borderRadius: "20px" /* Rounded corners */,
  padding: "0.2rem"
};

export default ScrollToTop;
