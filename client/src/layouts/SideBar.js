import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import ItemModal from "../components/items/ItemModal";
import LogEntryModal from "../components/logs/LogEntryModal";
import { logoutUser } from "../actions/AuthState";
import StudyFieldModal from "../components/fields/StudyFieldModal";

const SideBar = ({ auth: { loading }, logoutUser, profile }) => {
  const onClick = e => {
    e.preventDefault();
    logoutUser();

    return <Link to="/"></Link>;
  };

  return !loading ? (
    <div data-component="sidebar">
      <div className="sidebar">
        <ul className="list-group flex-column d-inline-block first-menu">
          <li className="list-group-item pl-3 py-2">
            <button>
              <i className="far fa-user" aria-hidden="true" />
            </button>

            <ul className="list-group flex-column d-inline-block submenu">
              <li className="list-group-item pl-4">
                <button className="custom-link">Profile</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <span className="arrow"></span>
                  <li className="list-group-item pl-4">
                    {profile !== null ? (
                      <Link
                        to={`/profile/${profile.user._id}`}
                        className="custom-link"
                      >
                        Home
                      </Link>
                    ) : (
                      <div className="custom-link">Home</div>
                    )}
                  </li>
                  <li className="list-group-item pl-4">
                    <Link
                      to="/api/profile/profile-edit"
                      className="custom-link"
                    >
                      Edit
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-group-item pl-4">
                <button>Classmates</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/profile/friends" className="custom-link">
                      People
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <Link to="/api/profile/groups" className="custom-link">
                      Groups
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <button>Social</button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="list-group-item pl-3 py-2">
            <button>
              <i className="fas fa-book-reader" aria-hidden="true" />
            </button>
            <ul className="list-group flex-column d-inline-block submenu">
              <li className="list-group-item pl-4">
                <button>Study Items</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/items" className="custom-link">
                      My Study Items
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <ItemModal />
                  </li>
                </ul>
              </li>

              <li className="list-group-item pl-4">
                <button className="">Log Entries</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/logs" className="custom-link">
                      My Log Entries
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <LogEntryModal />
                  </li>
                </ul>
              </li>

              <li className="list-group-item pl-4">
                <button className="">Study Fields</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/fields" className="custom-link">
                      My Fields of Study
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <StudyFieldModal />
                  </li>
                </ul>
              </li>

              <li className="list-group-item pl-4">
                <button className="">Study Material</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/materials" className="custom-link">
                      My Study Material
                    </Link>
                  </li>
                  <li className="list-group-item pl-4">
                    <button>Add New Study Material</button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="list-group-item pl-3 py-2">
            <button>
              <i className="far fa-address-card" aria-hidden="true" />
            </button>
            <ul className="list-group flex-column d-inline-block submenu">
              <li className="list-group-item pl-4">
                <button>Contact</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <button>Help Desk</button>
                  </li>
                  <li className="list-group-item pl-4">
                    <button>FAQ</button>
                  </li>
                  <li className="list-group-item pl-4">
                    <button>Contact Info</button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="list-group-item pl-3 py-2">
            <button
              onClick={e => {
                onClick(e);
              }}
            >
              <i className="fas fa-power-off" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
      Loading...
    </Spinner>
  );
};

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(SideBar);
