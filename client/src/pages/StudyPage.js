import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";

import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import { getItem } from "../actions/ItemState";
import Spinner from "../background/Spinner";
import StudyHeader from "../components/items/StudyHeader";
import StudyNav from "../components/items/StudyNav";

const StudyPage = ({ getItem, auth, item: { item }, match }) => {
  useEffect(() => {
    getItem(match.params.id);
  }, [getItem, match.params.id]);

  return item !== null &&
    item !== undefined &&
    Object.keys(item).length !== 0 ? (
    <div>
      <StudyHeader />
      <div className="container-studypage">
        <Container className="container-left">
          <StudyNav />
        </Container>

        <Container className="container-right">
          <Row>
            <Col>
              <CommentForm itemId={item._id} />
            </Col>
            <Col>
              <CommentList item={item} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
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
