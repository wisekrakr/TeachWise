import React, { Fragment } from "react";
import { Jumbotron, ListGroup, Col, Row } from "reactstrap";

import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";
import ItemModal from "../components/items/ItemModal";
import LogEntryModal from "../components/logs/LogEntryModal";

const Index = () => {
  return (
    <Fragment>
      <Jumbotron id="top">
        <h1 className="text-center large-heading mt-2">
          Mental Acquisitiveness
        </h1>
        <p className="lead text-center">Your Personal Path To Knowledge</p>

        <ListGroup
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <ItemModal />
          <LogEntryModal />
        </ListGroup>
      </Jumbotron>
      <Row>
        <Col>
          <StudyList />
        </Col>
        <Col>
          <LogEntryList />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Index;
