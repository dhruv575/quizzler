import React from "react";
import "./Download.css";

const Download = () => {
  return (
    <div className="download-strip">
      <button className="download-button">Download Kahoot CSV</button>
      <button className="download-button">Download Quizlet CSV</button>
      <button className="download-button">Download Skribbl List TXT</button>
    </div>
  );
};

export default Download;
