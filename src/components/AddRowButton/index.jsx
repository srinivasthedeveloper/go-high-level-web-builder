import React from "react";

function AddRowButton({ onClick }) {
  return (
    <button className="add-row-button" onClick={onClick}>
      + Add New Row
    </button>
  );
}

export { AddRowButton };
