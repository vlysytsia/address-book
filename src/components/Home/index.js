import React, { useEffect, useRef, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userPropTypes } from "../../helpers/proptypes";
import { debounce } from "../../helpers";
import {
  loadUsers,
  setActiveUser,
  selectIsShowNoResults,
  selectIsShowError,
  selectIsLoadingAvailabel,
  selectFilteredUsers,
  selectLoading,
  selectActiveUser,
  selectActiveUserId
} from "../../store/users";
import Filter from "../Filter";
import Loader from "../Loading";
import Message from "../Message";
import UserDetails from "../UserDetails";
import UserInfo from "../UserInfo";
import "./home.css";

const Modal = React.lazy(() => import("../Modal"));
const OFFSET = 200;

export const Home = ({
  users,
  loading,
  isLoadingAvailable,
  loadUsers,
  showError,
  setActiveUser,
  showNoResults,
  selectedUser
}) => {
  const grid = useRef(null);
  const loadMoreDebounce = debounce(loadUsers, 500);

  // initial user loading
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // add infinity scroll effect
  useEffect(() => {
    const loadMore = () => {
      const isScrolledToBottom = window.pageYOffset + window.innerHeight >= grid.current.scrollHeight - OFFSET;
      if (!loading && isScrolledToBottom) {
        loadMoreDebounce();
      }
    };

    // add event listener only if not all users were loaded
    if (isLoadingAvailable) {
      document.addEventListener("scroll", loadMore);
    } else {
      document.removeEventListener("scroll", loadMore);
    }

    return () => {
      // cleanup effect
      document.removeEventListener("scroll", loadMore);
    };
  }, [loadMoreDebounce, isLoadingAvailable, loading]);

  return (
    <div className="container">
      <h1>Address book app</h1>
      <div ref={grid}>
        <Filter />
        <div className="grid">
          {users.map(user => (
            <UserInfo {...user} key={user.login.uuid} onDetailsClick={() => setActiveUser(user.login.uuid)} />
          ))}
        </div>
      </div>

      {loading && <Loader />}
      {!isLoadingAvailable && <Message data-test="end-catalog" text="End of users catalog" />}
      {showNoResults && <Message data-test="no-results" text="No results" />}
      {showError && (
        <Message data-test="error" type="error" text="Something went wrong, please contact our support team" />
      )}

      <Suspense fallback={<Loader />}>
        <Modal isOpen={!!selectedUser} onClose={() => setActiveUser(null)}>
          <UserDetails {...selectedUser} />
        </Modal>
      </Suspense>
    </div>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(userPropTypes)),
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  showNoResults: PropTypes.bool,
  loadUsers: PropTypes.func.isRequired,
  setActiveUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape(userPropTypes)
};

Home.defaultProps = {
  users: [],
  isLoadingAvailable: true
};

const mapStateToProps = createStructuredSelector({
  users: selectFilteredUsers,
  loading: selectLoading,
  showError: selectIsShowError,
  selectedUserId: selectActiveUserId,
  selectedUser: selectActiveUser,
  showNoResults: selectIsShowNoResults,
  isLoadingAvailable: selectIsLoadingAvailabel
});

const mapDispatchToProps = {
  loadUsers,
  setActiveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
