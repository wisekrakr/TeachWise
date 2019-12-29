import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import {
  Container,
  Badge,
  Jumbotron,
  ListGroup,
  Col,
  Row,
  Button
} from "reactstrap";

import { getField } from "../actions/FieldState";
import { textTruncate } from "../helpers/text";
import Spinner from "../background/Spinner";
import ItemByFieldList from "../components/items/item-lists/ItemByFieldList";

const StudyFieldPage = ({
  getField,
  auth,
  field: { field, loading },
  match
}) => {
  useEffect(() => {
    getField(match.params.id);
  }, [getField, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return field !== null &&
    field !== undefined &&
    Object.keys(field).length !== 0 ? (
    <Fragment>
      <Jumbotron fluid className="jumbo-item">
        <Container fluid>
          <h1 className="large-heading heading">
            {textTruncate(field.name, 40)}{" "}
          </h1>

          <div className="right">
            <span className="mr-4">
              This topic was added on{" "}
              <Moment format="YYYY-MM-DD HH:mm">{field.date}</Moment>
            </span>
          </div>
        </Container>
      </Jumbotron>

      <Container>
        <ItemByFieldList match={match} />{" "}
      </Container>
    </Fragment>
  ) : (
    <Spinner />
  );
};

StudyFieldPage.propTypes = {
  getField: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field,
  auth: state.auth
});

export default connect(mapStateToProps, { getField })(StudyFieldPage);
