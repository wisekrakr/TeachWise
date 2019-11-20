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
  Spinner,
  Col,
  Row
} from "reactstrap";

import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import { getItem } from "../actions/ItemState";
import { textTruncate } from "../helpers/TextHelper";

const StudyPage = ({ getItem, item: { item, loading }, match }) => {
  useEffect(() => {
    getItem(match.params.id);
  }, [getItem, match.params.id]);

  const statusColor = () => {
    let color = "";
    switch (item.status) {
      case "Not Started":
        color = "danger";
        break;
      case "Started":
        color = "secondary";
        break;
      case "Going Strong":
        color = "info";
        break;
      case "Last Stages":
        color = "primary";
        break;
      case "Completed":
        color = "success";
        break;
      case "Mastered":
        color = "warning";
        break;
      default:
        color = "primary";
    }
    return color;
  };

  if (loading) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  }

  return item !== null &&
    item !== undefined &&
    Object.keys(item).length !== 0 ? (
    <Fragment>
      <Jumbotron fluid>
        <Container fluid>
          <Badge
            className="status-badge"
            color={statusColor()}
            style={{ float: "right", marginTop: "2rem" }}
          >
            {item.status}
          </Badge>
          <h1 className="display-3">{textTruncate(item.name, 40)}</h1>

          <p className="lead">
            This topic was added on{" "}
            <Moment format="YYYY-MM-DD HH:mm">{item.date}</Moment>
          </p>
          <hr className="my-2" />
          <p>
            Field of Study:{" "}
            <strong>{textTruncate(item.field_of_study, 40)}</strong>{" "}
          </p>
          <p>
            Study Material: <strong>{item.material}</strong>{" "}
          </p>
          <p>
            Learning Curve: <strong>{item.difficulty}</strong>{" "}
          </p>

          <ListGroup className="flex-row m-auto">
            <Link
              to={`/api/items/${item.name}`}
              className="btn btn-dark mt-4"
              color="dark"
            >
              More {textTruncate(item.name, 15)}
            </Link>

            <Link
              to={`/api/items/${item.field_of_study}`}
              className="btn btn-dark mt-4 ml-4"
              color="dark"
            >
              More {textTruncate(item.field_of_study, 15)}
            </Link>
          </ListGroup>
        </Container>
      </Jumbotron>

      <Container>
        <Row>
          <Col>
            <CommentForm itemId={item._id} />
          </Col>
          <Col>
            <CommentList item={item} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
      Loading...
    </Spinner>
  );
};

StudyPage.propTypes = {
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItem })(StudyPage);
