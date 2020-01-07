import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ItemModal from "../components/items/item-input/ItemModal";
import LogEntryModal from "../components/logs/LogEntryModal";
import { deleteAccount } from "../actions/ProfileState";
import { logoutUser } from "../actions/AuthState";
import StudyFieldModal from "../components/fields/StudyFieldModal";
import Spinner from "../background/Spinner";
import { getCurrentProfile } from "../actions/ProfileState";

const SideBar = ({
  auth: { user, loading },
  logoutUser,
  profile,
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const onClick = e => {
    e.preventDefault();
    logoutUser();

    return <Link to="/"></Link>;
  };

  const onDelete = e => {
    e.preventDefault();
    deleteAccount(profile.user._id);
    logoutUser();
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
                  <li className="list-group-item pl-4">
                    {profile !== null && profile !== undefined ? (
                      <Link to="/profile-edit" className="custom-link">
                        Edit
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="list-group-item pl-4">
                    <button onClick={onDelete}>Delete Account</button>
                  </li>
                </ul>
              </li>

              <div>
                <li className="list-group-item pl-4">
                  <Link to="/api/profile" className="custom-link">
                    Profiles
                  </Link>
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
              </div>
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
                    {/* <StudyFieldModal /> */}
                  </li>
                </ul>
              </li>

              <li className="list-group-item pl-4">
                <button className="">Skills</button>

                <ul className="list-group flex-column d-inline-block sub-submenu">
                  <li className="list-group-item pl-4">
                    <Link to="/api/materials" className="custom-link">
                      My Skills
                    </Link>
                  </li>

                  <li className="list-group-item pl-4">
                    <button>Add New Skill</button>
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
            <Link
              onClick={e => {
                onClick(e);
              }}
              to="/"
              style={{ color: `rgb(202, 200, 200)` }}
            >
              <i className="fas fa-power-off" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  logoutUser,
  deleteAccount
})(SideBar);
