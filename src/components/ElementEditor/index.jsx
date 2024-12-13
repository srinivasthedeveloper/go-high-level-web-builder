import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { cssToStyleObject, parseStyles } from "../../utils/styleParser";

function ElementEditor({ element, onUpdateElement, onDeleteElement }) {
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    if (element.rowId) {
      parseStyles(element.styles);
      setInputValue({
        text: element.text || "",
        src: element.src || "",
        alt: element.alt || "",
        styles: parseStyles(element.styles) || null,
      });
    }
  }, [element.rowId, element.colIndex]);

  return (
    <div className={styles.elementEditor}>
      {RenderTypeBasedContent()}

      <div className={styles.propertySection}>
        <h3>Custom CSS</h3>
        <textarea
          className={styles.cssEditor}
          value={inputValue?.styles}
          onChange={(e) => {
            setInputValue({ ...inputValue, styles: e.target.value });
          }}
          placeholder="Enter CSS styles...
  Example:
  color: #333333;
  font-size: 16px;
  padding: 10px;
  background-color: #ffffff;"
          rows={10}
        />
      </div>

      <RenderFooter />
    </div>
  );

  function RenderTypeBasedContent() {
    return (
      <div className={styles.propertySection}>
        <h3>Update Content</h3>
        {element.type === "image" ? (
          <>
            <label>Image URL</label>
            <input
              type="text"
              value={inputValue?.src || ""}
              onChange={(e) => {
                setInputValue({ ...inputValue, src: e.target.value });
              }}
              placeholder="Enter image URL..."
            />
            <label>Alt Text</label>
            <input
              type="text"
              value={inputValue?.alt || ""}
              onChange={(e) => {
                setInputValue({ ...inputValue, alt: e.target.value });
              }}
              placeholder="Enter alt text..."
            />
          </>
        ) : element?.type === "button" ? (
          <>
            <label>Enter Url</label>
            <input
              type="text"
              value={inputValue?.src}
              onChange={(e) => {
                setInputValue({ ...inputValue, src: e.target.value });
              }}
              placeholder="Enter Url..."
            />
            <label>Text Content</label>
            <input
              type="text"
              value={inputValue?.text}
              onChange={(e) => {
                setInputValue({ ...inputValue, text: e.target.value });
              }}
              placeholder="Enter text..."
            />
          </>
        ) : (
          <>
            <label>Text Content</label>
            <input
              type="text"
              value={inputValue?.text}
              onChange={(e) => {
                setInputValue({ ...inputValue, text: e.target.value });
              }}
              placeholder="Enter text..."
            />
          </>
        )}
      </div>
    );
  }

  function RenderFooter() {
    return (
      <div className={styles.buttonContainer}>
        <button
          className={styles.saveBtn}
          onClick={() => {
            onUpdateElement({
              ...element,
              ...inputValue,
              styles: cssToStyleObject(inputValue.styles),
            });
          }}
        >
          Save Changes
        </button>

        <button
          className={styles.deleteBtn}
          onClick={() => onDeleteElement(element)}
        >
          Delete Element
        </button>
      </div>
    );
  }
}

export { ElementEditor };
