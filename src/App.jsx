import React, { useEffect, useState } from "react";
import { RightDrawer } from "./container/RightDrawer";
import { Footer } from "./components/Footer";
import "./styles/app.css";
import { ELEMENT_TYPES } from "./constants/elements";
import { Canvas } from "./container/Canvas";

function App() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementData, setSelectedElementData] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = () => {
    const layoutData = {
      rows,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem("website-builder-layout", JSON.stringify(layoutData));
    alert("Layout saved successfully!");
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Load saved layout on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem("website-builder-layout");
    if (savedLayout) {
      try {
        const { rows: savedRows } = JSON.parse(savedLayout);
        setRows(savedRows);
      } catch (error) {
        console.error("Error loading saved layout:", error);
      }
    }
  }, []);

  // Row Management

  const handleUpdateRow = (rowId, style) => {
    setRows(
      rows.map((row) => (row.id === rowId ? { ...row, styles: style } : row))
    );
    setShowDrawer(false);
  };

  const handleDeleteRow = (rowId) => {
    setRows(rows.filter((row) => row.id !== rowId));
    setShowDrawer(false);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDrawerType("row-edit");
    setShowDrawer(true);
  };

  const handleSelectColumns = (columnCount) => {
    const newRow = {
      id: Date.now(),
      columns: Array(columnCount)
        .fill()
        .map(() => ({
          id: Date.now() + Math.random(),
          element: null,
        })),
    };

    setRows([...rows, newRow]);
    setShowDrawer(false);
  };

  // Element Management
  const handleSelectElement = (elementType) => {
    const { rowId, colIndex: columnIndex } = selectedElementData;
    const newElement = {
      id: Date.now(),
      rowId: rowId,
      colIndex: columnIndex,
      type: elementType,
      ...ELEMENT_TYPES[elementType].defaultProps,
    };

    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const newColumns = [...row.columns];
          newColumns[columnIndex] = {
            ...newColumns[columnIndex],
            element: newElement,
          };
          return { ...row, columns: newColumns };
        }
        return row;
      })
    );
    setShowDrawer(false);
    setSelectedElementData(null);
  };

  const handleUpdateElement = (updatedElement) => {
    setRows(
      rows.map((row) => {
        if (row.id === updatedElement.rowId) {
          const newColumns = [...row.columns];
          newColumns[updatedElement.colIndex] = {
            ...newColumns[updatedElement.colIndex],
            element: updatedElement,
          };
          return { ...row, columns: newColumns };
        }
        return row;
      })
    );
    setShowDrawer(false);
  };

  const handleDeleteElement = (element) => {
    const { rowId, colIndex: columnIndex } = element ?? {};
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const newColumns = [...row.columns];
          newColumns[columnIndex] = {
            ...newColumns[columnIndex],
            element: null,
          };
          return { ...row, columns: newColumns };
        }
        return row;
      })
    );
    setShowDrawer(false);
    setSelectedElementData(null);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Canvas
          isPreviewMode={isPreviewMode}
          rows={rows}
          setRows={setRows}
          onAddRow={() => {
            setDrawerType("column-select");
            setShowDrawer(true);
          }}
          onElementClick={(element) => {
            setSelectedElement(element);
            setDrawerType("element-properties");
            setShowDrawer(true);
          }}
          onAddElement={(rowId, colIndex) => {
            setDrawerType("elements");
            setSelectedElementData({ rowId, colIndex });
            setShowDrawer(true);
          }}
          onRowClick={handleRowClick}
        />
        <RightDrawer
          show={showDrawer && !isPreviewMode}
          type={drawerType}
          onClose={() => {
            setShowDrawer(false);
            setSelectedRow(null);
          }}
          selectedRow={selectedRow}
          onUpdateRow={handleUpdateRow}
          onDeleteRow={handleDeleteRow}
          selectedElement={selectedElement}
          onSelectColumns={handleSelectColumns}
          onSelectElement={handleSelectElement}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
        />
      </div>
      <Footer
        onSave={handleSave}
        onPreview={handlePreview}
        cancelText={isPreviewMode ? "Edit" : "Preview"}
      />
    </div>
  );
}

export default App;
