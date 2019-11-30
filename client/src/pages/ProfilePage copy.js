import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import { getProfileById } from "../actions/ProfileState";
import ProfileMain from "../components/profiles/ProfileMain";
import ProfileInfo from "../components/profiles/ProfileInfo";
import ProfileEducation from "../components/profiles/ProfileEducation";
import StudyFieldsList from "../components/fields/StudyFieldsList";
import LogEntryList from "../components/logs/LogEntryList";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return profile !== null && !loading ? (
    <div className="profile-container">
      <div>
        <div className="row">
          <div className="left col-lg-4">
            <div className="photo-left">
              <img className="photo" src={profile.user.avatar} />
              <div className="active"></div>
            </div>
            <h4 className="name">{profile.user.name}</h4>
            <p className="info">{profile.user.email}</p>
            <div className="stats row">
              <div className="stat col-xs-4">
                <p className="number-stat">3,619</p>
                <p className="desc-stat">Followers</p>
              </div>
              <div className="stat col-xs-4">
                <p className="number-stat">42</p>
                <p className="desc-stat">Following</p>
              </div>
              <div className="stat col-xs-4">
                <p className="number-stat">38</p>
                <p className="desc-stat">Study Items</p>
              </div>
              <div className="stat col-xs-4">
                <p className="number-stat">12</p>
                <p className="desc-stat">Fields of Study</p>
              </div>
            </div>
            <div className="profile-about desc p-2">
              {profile.bio && (
                <Fragment>
                  <h2 className="text-primary">
                    {profile.user.name.trim().split(" ")[0]}s Bio
                  </h2>
                  <p>{profile.bio}</p>
                  <div className="header-underline" />
                </Fragment>
              )}
            </div>
            <div className="social">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {profile.social && profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {profile.social && profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {profile.social && profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {profile.social && profile.social.youtube && (
                <a
                  href={profile.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {profile.social && profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </div>
          </div>
          <div className="tabs bg-dark">
            <div className="container row">
              <div
                id="tab-1"
                className="tab-item tab-border col-sm text-center"
              >
                <i className="fab fa-youtube fa-3x"></i>
                <p className="hide-sm">Watch videos</p>
              </div>
              <div id="tab-2" className="tab-item col-sm text-center">
                <i className="fas fa-gamepad fa-3x"></i>
                <p className="hide-sm">Play games</p>
              </div>
              <div id="tab-3" className="tab-item col-sm text-center">
                <i className="fas fa-music fa-3x"></i>
                <p className="hide-sm">Listen music</p>
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="container">
              <div id="tab-1-content" className="tab-content-item show">
                <div className="tab-1-content-inner row">
                  <div className="col-md-3">
                    <p className="text-md text-center">
                      The Wisekrakr in Games is a gaming channel on youtube,
                      specialized in making funny, creative and often cinematic
                      gaming videos.
                    </p>
                    <a
                      href="https://www.youtube.com/channel/UCou-pJo7WUuyPndgnxIndtw"
                      className="btn btn-secondary large-btn"
                    >
                      Watch for free!
                    </a>
                  </div>
                  <div className="col-md-9">
                    <img
                      src="https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/wg_logo.png"
                      alt=""
                      width="300px"
                    />
                  </div>
                </div>
              </div>

              <div id="tab-2-content" className="tab-content-item show">
                <StudyFieldsList showAll={false} />
              </div>

              <div id="tab-3-content" className="tab-content-item show">
                <LogEntryList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // <Fragment>
    //   {profile === null || loading ? (
    //     <Spinner>Loading Profile....</Spinner>
    //   ) : (
    //     <Fragment>
    //       {auth.isAuthenticated &&
    //         auth.loading === false &&
    //         auth.user._id === profile.user._id && (
    //           <Link to="/profile-edit" classNameName="btn btn-dark">
    //             Edit Profile
    //           </Link>
    //         )}
    //       <div classNameName="profile-grid my-1">
    //         <ProfileMain profile={profile} />
    //         <ProfileInfo profile={profile} />

    //         <div classNameName="profile-edu bg-white p-2">
    //           <h2 classNameName="text-primary">Education</h2>
    //           {profile.education.length > 0 ? (
    //             <Fragment>
    //               {profile.education.map(education => (
    //                 <ProfileEducation
    //                   key={education._id}
    //                   education={education}
    //                 />
    //               ))}
    //             </Fragment>
    //           ) : (
    //             <h4>No education credentials</h4>
    //           )}
    //         </div>
    //       </div>
    //     </Fragment>
    //   )}
    // </Fragment>
    <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
      Loading...
    </Spinner>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
