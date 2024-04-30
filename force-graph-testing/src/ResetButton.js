import React from "react";

function ResetButton({ onReset }) {
  function handleClick(e) {
    onReset();
  }
  return (
    <div className="resetButton">
      <button onClick={handleClick}>Reset</button>
    </div>
  );
}

export default ResetButton;
