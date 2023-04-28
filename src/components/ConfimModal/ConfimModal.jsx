import React from "react";
import styles from "./ConfimModal.module.css";

const ConfimModal = (props) => {
  return (
    <>
      <div className={styles.bg} onClick={props.handleClose} />
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <p>Delete blog</p>
        </div>
        <div className={styles.modalBody}>
          <p>Are you sure want to delete blog?</p>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.submit} onClick={props.handleSubmit}>
            Delete
          </button>
          <button className={styles.cancel} onClick={props.handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfimModal;
