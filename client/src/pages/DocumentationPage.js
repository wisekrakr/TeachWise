import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "reactstrap";

import { getDoc } from "../actions/DocumentState";
import { getItem } from "../actions/ItemState";
import Spinner from "../background/Spinner";

const DocumentationPage = ({
  getDoc,
  document: { document, loading },
  item: { item },
  match,
  history
}) => {
  useEffect(() => {
    getDoc(match.params.id);
    getItem(item._id);
  }, [getDoc, getItem, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return document !== null && document !== undefined ? (
    <Fragment>
      <Jumbotron fluid className="jumbo-item">
        <Container fluid>
          <h1 className="large-heading display-1">{document.title}</h1>

          <p className="lead">
            This document was added on{" "}
            <Moment format="YYYY-MM-DD HH:mm">{document.date}</Moment>
            <br />
            {document.description !== null &&
            document.description !== undefined &&
            document.description !== "" ? (
              <em>Description: {document.description}</em>
            ) : (
              ""
            )}
          </p>

          <hr className="my-2" />
          <Button
            onClick={() => {
              history.goBack();
            }}
            className="btn draw-border"
          >
            Go Back
          </Button>
          <Link to={`/document-edit/${item._id}`} className="btn draw-border">
            Edit Document
          </Link>
        </Container>
      </Jumbotron>
      <Container className="mx-md-auto">
        {document.info !== undefined ? (
          document.info.split("\n").map((text, i) => {
            return (
              <p key={i} data={text}>
                {text}
              </p>
            );
          })
        ) : (
          <Spinner />
        )}
      </Container>
    </Fragment>
  ) : (
    <Spinner />
  );
};

DocumentationPage.propTypes = {
  getDoc: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  document: state.document,
  item: state.item
});

export default connect(mapStateToProps, { getDoc, getItem })(DocumentationPage);
