import React from "react";
import { Jumbotron, Container, ListGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";
import ItemModal from "../components/items/ItemModal";
import LogEntryModal from "../components/logs/LogEntryModal";

const Main = () => {
  return (
    <div id="main">
      <Jumbotron className="main" id="top">
        <h1 className="text-center large-heading mt-2">
          Mental Acquisitiveness
        </h1>

        <h3 className="lead text-center">Your Personal Path To Knowledge</h3>

        <ListGroup
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <ItemModal />
          <LogEntryModal />
        </ListGroup>
      </Jumbotron>
      <Container className="index-container">
        <Row>
          <Col>
            <StudyList />
          </Col>
          <Col>
            <LogEntryList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
