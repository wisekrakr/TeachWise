import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import styled from "styled-components";

import { getFields } from "../../actions/FieldState";
import StudyFieldItem from "./StudyFieldItem";
import Spinner from "../../background/Spinner";
// import ListPagination from "../../background/ListPagination";

const StudyFieldsList = ({ getFields, field: { fields, loading } }) => {
  useEffect(() => {
    getFields();
  }, [getFields]);

  if (
    fields === null &&
    fields === undefined &&
    Object.keys(fields).length === 0
  ) {
    return <Spinner />;
  }

  const AltListStyle = styled.ol`
    counter-reset: ${fields.length};

    > li {
      counter-increment: ${fields.length};
    }
  `;

  return fields !== null &&
    fields !== undefined &&
    Object.keys(fields).length > 0 ? (
    <Container className="narrow">
      <h6 className="text-center small-heading">
        Recently added fields of study
      </h6>

      <p className="heading-underline" />
      {fields !== null && fields !== undefined && !loading ? (
        <AltListStyle className="alt-list">
          {fields.map(field => (
            <StudyFieldItem key={field._id} field={field} />
          ))}
        </AltListStyle>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <h6 className="x-small-heading">
        Add a Study Field before you add new Study Items
      </h6>
    </Fragment>
  );
};

StudyFieldsList.prototypes = {
  getFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { getFields })(StudyFieldsList);
