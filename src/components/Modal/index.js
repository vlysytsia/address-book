import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import useEscPress from "../../hooks/useEscPress";
import useToggleBodyScrroll from "../../hooks/useToggleBodyScrroll";
import styles from "./modal.module.css";

const Modal = ({ children, onClose, isOpen }) => {
  useToggleBodyScrroll(isOpen);
  useEscPress(onClose);

  return createPortal(
    <div className={`${styles.overlay} ${isOpen && styles.open}`}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          &#215;
        </button>
        {isOpen && <div className="content">{children}</div>}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

Modal.defaultProps = {
  isOpen: false
};

export default Modal;
