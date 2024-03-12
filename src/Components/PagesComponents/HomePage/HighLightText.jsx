import React from "react";

const HighLightText = ({ text }) => {
  return (
    <div className="text-transparent bg-clip-text font-bold inline textgradient bg-clip-tex">
      {text}
    </div>
  );
};

export default HighLightText;
