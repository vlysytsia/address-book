import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeSettingsValue, selectNationality } from "../../store/settings";
import { NATIONALITIES } from "../../constats";
import styles from "./settings.module.css";

export const Settings = ({ nationality, changeValue }) => {
  const onChange = ({ target }) => {
    const { name, value } = target;
    changeValue({ name, value });
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <form>
        <label className={styles.label} htmlFor="nationality">
          Nationality
        </label>
        <select className={styles.select} value={nationality} onChange={onChange} id="nationality" name="nationality">
          {NATIONALITIES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

Settings.propTypes = {
  changeValue: PropTypes.func.isRequired,
  nationality: PropTypes.string
};

const mapStateToProps = state => ({
  nationality: selectNationality(state)
});

const mapDispatchToProps = {
  changeValue: changeSettingsValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
