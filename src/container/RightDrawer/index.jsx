import React from "react";
import styles from "./style.module.css";
import { ElementEditor } from "../../components/ElementEditor";
import { RowEditor } from "../../components/RowEditor/index.jsx";

function RightDrawer({
  show,
  type,
  onClose,
  onSelectColumns,
  onSelectElement,
  selectedElement,
  onUpdateElement,
  selectedRow,
  onUpdateRow,
  onDeleteRow,
  onDeleteElement,
}) {
  const renderDrawerContent = () => {
    switch (type) {
      case "element-properties":
        if (!selectedElement) return;
        return (
          <ElementEditor
            element={selectedElement}
            rowId={selectedElement.id}
            columnIndex={selectedElement.columnIndex}
            onUpdateElement={onUpdateElement}
            onDeleteElement={onDeleteElement}
          />
        );
      case "row-edit":
        return (
          <RowEditor
            selectedRow={selectedRow}
            onSave={onUpdateRow}
            onDelete={onDeleteRow}
            onClose={onClose}
          />
        );
      case "column-select":
        const columns = [1, 2, 3, 4];
        return (
          <div className={styles.drawerContent}>
            <h3>Select Layout</h3>
            <div className={styles.columnOptions}>
              {columns.map((column) => (
                <button
                  className={styles.layoutBtn}
                  onClick={() => onSelectColumns(column)}
                >
                  <div className={`${styles.layoutPreview}`}>
                    {[...Array(column)].map((_, index) => (
                      <div key={index} className={styles.column}></div>
                    ))}
                  </div>
                  <span>{column} Column</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "elements":
        return (
          <div className={styles.drawerContent}>
            <h3>Add Element</h3>
            <div className={styles.elementOptions}>
              <button
                className={styles.elementBtn}
                onClick={() => onSelectElement("heading")}
              >
                <span className={styles.elementIcon}>H</span>
                <span>Heading</span>
              </button>
              <button
                className={styles.elementBtn}
                onClick={() => onSelectElement("paragraph")}
              >
                <span className={styles.elementIcon}>P</span>
                <span>Paragraph</span>
              </button>
              <button
                className={styles.elementBtn}
                onClick={() => onSelectElement("list")}
              >
                <span className={styles.elementIcon}>L</span>
                <span>List</span>
              </button>
              <button
                className={styles.elementBtn}
                onClick={() => onSelectElement("button")}
              >
                <span className={styles.elementIcon}>L</span>
                <span>Link</span>
              </button>
              <button
                className={styles.elementBtn}
                onClick={() => onSelectElement("image")}
              >
                <span className={styles.elementIcon}>I</span>
                <span>Image</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.rightDrawer} ${show ? styles.show : ""}`}>
      <div className={styles.drawerHeader}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>
      {renderDrawerContent()}
    </div>
  );
}

export { RightDrawer };
