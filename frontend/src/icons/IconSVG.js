import React from "react";

const icons = {
  starBorder: require("./starBorder.svg"),
  starFill : require("./starFill.svg"),
};

const IconSVG = ({ name, ...props }) => {
  if(!icons[name])
  {
    return null
  }
  const { ReactComponent: SVGComponent } = icons[name];
  return <SVGComponent {...props} />;
};

export default IconSVG;
