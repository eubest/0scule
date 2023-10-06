import React from "react";

import styles from "./Navbar.module.css"; // Import the CSS module

interface StampProps {
  width?: number;
  height?: number;
  className?: string;
}

function Stamp({ width = 200, height = 200, ...rest }: StampProps) {
  return (
    <div className={styles.stampContainer}>
      {" "}
      {/* Add container element */}
      <svg
        width={width}
        height={height}
        viewBox="0 -29 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={rest.className}
      >
        <image href="/SculeBJCcol2.svg" width={width} height={height} />
      </svg>
    </div>
  );
}

export default Stamp;
