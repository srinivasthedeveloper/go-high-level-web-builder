import React from "react";
import styles from "./style.module.css";
import { RenderUiComponents } from "../../components/RenderElement";
import { useDnD } from "../../hooks/useDnD";

function Canvas({
  isPreviewMode,
  rows,
  onElementClick,
  onAddElement,
  setRows,
  onAddRow,
  onRowClick,
}) {
  const {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDnD(rows, setRows);

  return (
    <div
      className={`${styles.canvasContainer} ${
        isPreviewMode ? styles.previewMode : ""
      }`}
    >
      <div className={styles.canvasContent}>
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={styles.canvasRow}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRowClick(row);
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className={styles.rowContent} style={row.styles}>
              {row.columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  onClick={(e) => {
                    if (!isPreviewMode) {
                      e.preventDefault();
                    }
                    e.stopPropagation();
                    if (column.element) {
                      onElementClick({
                        ...column.element,
                        columnIndex: column.id,
                      });
                    }
                  }}
                  className={styles.column}
                >
                  {column.element ? (
                    <RenderUiComponents
                      element={column.element}
                      onElementClick={onElementClick}
                    />
                  ) : (
                    <div
                      className={styles.emptyColumn}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddElement(row.id, colIndex);
                      }}
                    >
                      <span className={styles.plusIcon}>+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addBtn} onClick={onAddRow}>
        <span className={styles.plusIcon}>+</span>
        <span>Add New Row</span>
      </button>
    </div>
  );
}

export { Canvas };
