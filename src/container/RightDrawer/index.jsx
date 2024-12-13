import React from "react";
import "./style.css";
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
        return (
          <div className="drawer-content">
            <h3>Select Layout</h3>
            <div className="column-options">
              <button className="layout-btn" onClick={() => onSelectColumns(1)}>
                <div className="layout-preview one-col"></div>
                <span>1 Column</span>
              </button>
              <button className="layout-btn" onClick={() => onSelectColumns(2)}>
                <div className="layout-preview two-col"></div>
                <span>2 Columns</span>
              </button>
            </div>
          </div>
        );

      case "elements":
        return (
          <div className="drawer-content">
            <h3>Add Element</h3>
            <div className="element-options">
              <button
                className="element-btn"
                onClick={() => onSelectElement("heading")}
              >
                <span className="element-icon">H</span>
                <span>Heading</span>
              </button>
              <button
                className="element-btn"
                onClick={() => onSelectElement("button")}
              >
                <span className="element-icon">B</span>
                <span>Button</span>
              </button>
              <button
                className="element-btn"
                onClick={() => onSelectElement("image")}
              >
                <span className="element-icon">I</span>
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
    <div className={`right-drawer ${show ? "show" : ""}`}>
      <div className="drawer-header">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      {renderDrawerContent()}
    </div>
  );
}

export { RightDrawer };
