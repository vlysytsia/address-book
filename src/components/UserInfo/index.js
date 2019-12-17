import React from "react";
import PropTypes from "prop-types";
import { userPropTypes } from "../../helpers/proptypes";
import styles from "./userInfo.module.css";

const UserInfo = ({ name: { last, first }, email, picture: { thumbnail }, onDetailsClick }) => {
  return (
    <div className={styles.user}>
      <img className={styles.thumbnail} src={thumbnail} alt="user thumbnail" />
      <div className={styles.info}>
        <h3 className={styles.name}>
          {first} {last}
        </h3>
        <a href={`mailto:${email}`} className={styles.email}>
          {email}
        </a>
      </div>
      <button className={styles.detailsBtn} onClick={onDetailsClick}>
        Details
      </button>
    </div>
  );
};
UserInfo.propTypes = {
  ...userPropTypes,
  onDetailsClick: PropTypes.func.isRequired
};

export default UserInfo;
