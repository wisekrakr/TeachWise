import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import StudyFieldItem from "../../fields/StudyFieldItem";
import { textTrimmer } from "../../../helpers/text";
import Spinner from "../../../background/Spinner";

const ProfileStudyFieldList = ({
  field: { user_fields, loading },
  auth: { user }
}) => {
  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">
        {textTrimmer(user.name)}s Fields of Study
      </h6>

      <p className="heading-underline" />
      {user_fields !== null && user !== null ? (
        <ol className="alt-list">
          {user_fields.map(field => (
            <StudyFieldItem key={field._id} field={field} />
          ))}
        </ol>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <div className="narrow">
        <h6 className="x-small-heading">
          Here will be all the fields you study in...
        </h6>
      </div>
    </Fragment>
  );
};

ProfileStudyFieldList.propTypes = {
  field: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field,
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileStudyFieldList);
