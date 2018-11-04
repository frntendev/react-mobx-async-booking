import React from "react";
import { css } from "react-emotion";
const Loader = props => {
  return (
    <div
      className={css`
        position: absolute;
        width: 100%;
        height: 100%;
      `}
    >
      <img
        className={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        `}
        src={"/assets/loader.gif"}
      />
    </div>
  );
};

export default Loader;
