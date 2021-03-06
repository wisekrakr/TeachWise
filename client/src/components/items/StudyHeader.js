import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Container, Badge, Jumbotron, ListGroup, Button } from "reactstrap";

import ItemModalEdit from "../items/item-input/ItemModalEdit";
import { textTruncate } from "../../helpers/text";
import Spinner from "../../background/Spinner";

const StudyHeader = ({ auth, item: { item, loading } }) => {
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
  return (
    <Fragment>
      <Jumbotron fluid className="jumbo-item">
        <Container fluid>
          {" "}
          <div className="left">
            <span className="mr-4">
              This topic was added on{" "}
              <Moment format="YYYY-MM-DD HH:mm">{item.date}</Moment>
            </span>
            <Badge className="status-badge" color={statusColor()}>
              {item.status}
            </Badge>
            <h1 className="large-heading heading">
              {textTruncate(item.name, 40)}{" "}
            </h1>
            <Link to={`/profile/${item.user}`} className="animated-link">
              {" "}
              created by {item.username}
            </Link>
          </div>
          <div className="right">
            <ListGroup className="flex-row ">
              <Link
                to={`/api/items/name/${item.name}`}
                className="btn draw-border mt-4"
              >
                More {textTruncate(item.name, 15)}
              </Link>

              <Link
                to={`/api/items/field/${item.field_of_study._id}`}
                className="btn draw-border  mt-4 ml-4"
              >
                More {textTruncate(item.field_of_study.name, 15)}
              </Link>
            </ListGroup>
            {item.user === auth.user._id ? (
              <ListGroup>
                <Button className="btn draw-border mt-4">
                  {" "}
                  <ItemModalEdit />
                </Button>
              </ListGroup>
            ) : null}
          </div>
          <hr className="my-2" />
          <div className="left">
            <p>
              Field of Study:{" "}
              <strong>{textTruncate(item.field_of_study.name, 40)}</strong>{" "}
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
    </Fragment>
  );
};

StudyHeader.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps)(StudyHeader);
