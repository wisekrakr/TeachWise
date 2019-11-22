import React, { Fragment } from "react";
import { Jumbotron, ListGroup, Col, Row } from "reactstrap";

import StudyList from "../components/items/StudyList";
import LogEntryList from "../components/logs/LogEntryList";
import TickerList from "../background/ticker/TickerList";
import ItemModal from "../components/items/ItemModal";
import LogEntryModal from "../components/logs/LogEntryModal";
import SideBar from "../layouts/SideBar";

const Main = () => {
  return (
    <Fragment>
      <Jumbotron className="main jumbo" id="top main">
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
      <TickerList />
      <SideBar />
      <div className="index-container">
        <Row>
          <Col>
            <StudyList />
          </Col>
          <Col>
            <LogEntryList />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Main;
