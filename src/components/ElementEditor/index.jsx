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
        tag: element.tag || "h1",
        items: element.items || [],
        styles: parseStyles(element.styles) || null,
      });
    }
  }, [element.rowId, element.colIndex]);

  return (
    <div className={styles.elementEditor}>
      <div className={styles.propertySection}>
        <h3>Update Content</h3>
        {RenderTypeBasedContent()}
      </div>

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
    switch (element.type) {
      case "image":
        return (
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
        );
      case "list":
        return (
          <>
            <label>Enter List Items</label>
            <input
              type="text"
              value={inputValue?.items?.join(";")}
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  items: e.target.value.split(";"),
                });
              }}
              placeholder="Enter list items..."
            />
          </>
        );
      case "button":
        return (
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
        );
      default:
        return (
          <>
            {element.type === "heading" ? (
              <select
                value={inputValue.tag}
                onChange={(e) => {
                  setInputValue({ ...inputValue, tag: e.target.value });
                }}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
              </select>
            ) : null}
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
        );
    }
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
