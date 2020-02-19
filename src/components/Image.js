import React from "react";

const Image = props => {
  return <img src={props.dataSrc} className={props.cssClass} />;
};

export default Image;
