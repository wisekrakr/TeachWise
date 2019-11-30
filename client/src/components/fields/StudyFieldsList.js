import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Spinner } from "reactstrap";

import { getFields } from "../../actions/FieldState";
import StudyFieldItem from "./StudyFieldItem";

const StudyFieldsList = ({
  getFields,
  field: { fields, loading },
  showAll
}) => {
  useEffect(() => {
    getFields();
  }, [getFields]);

  if (
    fields === null &&
    fields === undefined &&
    Object.keys(fields).length === 0
  ) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  }

  return fields.length !== 0 ? (
    <Container>
      {!showAll ? (
        <h3 className="text-center small-heading">Your fields of study</h3>
      ) : (
        <h3 className="text-center small-heading">
          Recently added fields of study
        </h3>
      )}
      <p className="heading-underline" />
      {fields !== null && !loading ? (
        <ol className="alt-list">
          {fields.map(field => (
            <StudyFieldItem key={field._id} field={field} showAll={showAll} />
          ))}
        </ol>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Loading....
        </Spinner>
      )}
    </Container>
  ) : (
    <Fragment>
      <h3 className="x-small-heading">
        Add a Study Field before you add new Study Items
      </h3>
    </Fragment>
  );
};

StudyFieldsList.prototypes = {
  getFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  showAll: PropTypes.bool
};
const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { getFields })(StudyFieldsList);
