import React from "react";
import { userPropTypes } from "../../helpers/proptypes";

const UserDetails = ({ location, cell, name }) => (
  <address>
    <h3>
      {name.first} {name.last}
    </h3>
    <p className="city">
      <b>City:</b> {location.city}
    </p>
    <p className="state">
      <b>State:</b> {location.state}
    </p>
    <p className="street">
      <b>Street:</b> {location.street.name}, {location.street.number}
    </p>
    <p className="postcode">
      <b>Postcode</b>: {location.postcode}
    </p>
    <p className="cell">
      <b>Cell:</b> <a href={`tel:${cell}`}>{cell}</a>
    </p>
  </address>
);

UserDetails.propTypes = {
  ...userPropTypes
};

export default UserDetails;
