import PropTypes from "prop-types";

export const userPropTypes = {
  name: PropTypes.shape({
    last: PropTypes.string,
    first: PropTypes.string
  }),
  picture: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
  location: PropTypes.shape({
    street: PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string
    }),
    city: PropTypes.string,
    state: PropTypes.string,
    postcode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  login: PropTypes.shape({
    uuid: PropTypes.string
  }),
  email: PropTypes.string,
  phone: PropTypes.string,
  cell: PropTypes.string
};
