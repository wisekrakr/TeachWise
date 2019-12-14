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

import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import ItemModalEdit from "../components/items/ItemModalEdit";
import { getItem } from "../actions/ItemState";
import { textTruncate } from "../helpers/TextHelper";
import Spinner from "../background/Spinner";

const StudyPage = ({ getItem, auth, item: { item, loading }, match }) => {
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
    return <Spinner />;
  }

  return item !== null &&
    item !== undefined &&
    Object.keys(item).length !== 0 ? (
    <Fragment>
      <Jumbotron fluid className="jumbo-item">
        <Container fluid>
          <h1 className="large-heading heading">
            {textTruncate(item.name, 40)}{" "}
          </h1>
          <Link to={`/profile/${item.user}`} className="animated-link">
            {" "}
            created by {item.username}
          </Link>

          <div className="right">
            <span className="mr-4">
              This topic was added on{" "}
              <Moment format="YYYY-MM-DD HH:mm">{item.date}</Moment>
            </span>
            <Badge className="status-badge" color={statusColor()}>
              {item.status}
            </Badge>
            <ListGroup className="flex-row m-auto">
              {item.user === auth.user._id ? (
                <Button className="btn draw-border pl-2 mt-4">
                  {" "}
                  <ItemModalEdit />
                </Button>
              ) : null}

              <Link
                to={`/api/items/${item.name}`}
                className="btn draw-border ml-4 mt-4"
              >
                More {textTruncate(item.name, 15)}
              </Link>

              <Link
                to={`/api/items/${item.field_of_study}`}
                className="btn draw-border  mt-4 ml-4"
              >
                More {textTruncate(item.field_of_study, 15)}
              </Link>
            </ListGroup>
          </div>
          <hr className="my-2" />

          <div className="left">
            <p>
              Field of Study:{" "}
              <strong>{textTruncate(item.field_of_study, 40)}</strong>{" "}
            </p>
            <p>
              Learning Curve: <strong>{item.difficulty}</strong>{" "}
            </p>

            <h2 className="text-md">Study Material</h2>
            <div className="materials">
              {item.material.map((mat, i) => (
                <div key={i}>
                  <i className="fas fa-book" /> {mat}
                </div>
              ))}
            </div>
          </div>
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
    <Spinner />
  );
};

StudyPage.propTypes = {
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItem })(StudyPage);
