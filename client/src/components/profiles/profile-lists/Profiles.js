import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container } from "reactstrap";

import { getProfiles } from "../../../actions/ProfileState";
import ProfileItem from "../ProfileItem";
import Spinner from "../../../background/Spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (
    profiles === null &&
    profiles === undefined &&
    Object.keys(profiles).length === 0
  ) {
    return <Spinner />;
  }

  return profiles !== null ? (
    <Container className="narrow">
      <h6 className="text-center small-heading">All Profiles</h6>
      <p className="heading-underline" />
      {profiles !== null &&
      profiles !== undefined &&
      Object.keys(profiles).length > 0 &&
      !loading ? (
        <ListGroup>
          {profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <h6 className="x-small-heading">No Profiles</h6>
    </Fragment>
  );
};

Profiles.prototypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
