import { useState } from "react";

function useDnD(rows, setRows) {
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedRowIndex(index);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    setDraggedRowIndex(null);
    e.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedRowIndex === null) return;

    const rows = document.querySelectorAll(".canvas-row");
    const draggedRow = rows[draggedRowIndex];
    const currentRow = rows[index];

    if (draggedRow && currentRow) {
      currentRow.classList.add("drag-over");
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedRowIndex === null) return;

    document.querySelectorAll(".canvas-row").forEach((row) => {
      row.classList.remove("drag-over");
    });

    const newRows = [...rows];
    const [movedRow] = newRows.splice(draggedRowIndex, 1);
    newRows.splice(index, 0, movedRow);

    setRows(newRows);
    setDraggedRowIndex(null);
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

export { useDnD };
