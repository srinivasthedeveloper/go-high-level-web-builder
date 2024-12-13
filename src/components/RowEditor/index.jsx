import { useEffect, useState } from "react";
import { cssToStyleObject, parseStyles } from "../../utils/styleParser";
import styles from "./style.module.css";

const RowEditor = ({ selectedRow, onSave, onDelete }) => {
  const [inputValue, setInputValue] = useState(selectedRow?.styles);

  useEffect(() => {
    if (selectedRow?.id) {
      setInputValue(parseStyles(selectedRow?.styles));
    }
  }, [selectedRow?.id]);

  if (!selectedRow) return null;

  return (
    <div className={styles.drawerContent}>
      <h3>Edit Row</h3>
      <div className={styles.propertiesForm}>
        <div className={styles.formGroup}>
          <label>Styles</label>
          <textarea
            className={styles.cssEditor}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
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

        <button
          className={styles.saveBtn}
          onClick={() => {
            onSave(selectedRow.id, cssToStyleObject(inputValue));
          }}
        >
          Save
        </button>

        <button
          className={styles.deleteBtn}
          onClick={() => {
            onDelete(selectedRow.id);
          }}
        >
          Delete Row
        </button>
      </div>
    </div>
  );
};

export { RowEditor };
