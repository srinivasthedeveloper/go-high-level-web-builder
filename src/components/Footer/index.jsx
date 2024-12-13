import styles from "./style.module.css";
function Footer({ onSave, onPreview, cancelText, confirmText }) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <button className={styles.previewBtn} onClick={onPreview}>
          {cancelText || "Preview"}
        </button>
        <button className={styles.saveBtn} onClick={onSave}>
          {confirmText || "Save"}
        </button>
      </div>
    </div>
  );
}

export { Footer };
