import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import StudyFieldItem from "../../fields/StudyFieldItem";
import { textTrimmer } from "../../../helpers/text";
import Spinner from "../../../background/Spinner";

const ProfileStudyFieldList = ({ fields, user }) => {
  if (
    fields === null &&
    fields === undefined &&
    Object.keys(fields).length === 0
  ) {
    return (
      <div>
        <p>Please add a field of study....</p>
      </div>
    );
  }

  return fields.length !== 0 ? (
    <Container>
      <h6 className="text-center small-heading">
        {textTrimmer(user.name)}s Fields of Study
      </h6>

      <p className="heading-underline" />
      {fields !== null && user !== null ? (
        <ol className="alt-list">
          {fields.map(field => (
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
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps)(ProfileStudyFieldList);
