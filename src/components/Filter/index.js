import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeFilterValue, selectFilterValue } from "../../store/users";
import styles from "./filter.module.css";

export const Filter = ({ onChange, value }) => {
  return (
    <div className={styles.filter}>
      <input
        className={styles.input}
        placeholder="Type to filter users"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className={styles.focusBorder} />
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

const mapStateToProps = state => ({
  value: selectFilterValue(state)
});

const mapDispatchToProps = {
  onChange: changeFilterValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
