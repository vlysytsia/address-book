import React from "react";
import PropTypes from "prop-types";
import styles from "./message.module.css";

const Message = ({ text, type }) => <p className={`${styles.message} ${styles[type]}`}>{text}</p>;

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "default"])
};

Message.defaultProps = {
  type: "default"
};

export default Message;
