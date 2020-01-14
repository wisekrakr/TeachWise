import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup, Container } from "reactstrap";
import { connect } from "react-redux";

import { getMyItems } from "../../../actions/ItemState";
import StudyItem from "../StudyItem";
import Spinner from "../../../background/Spinner";

const MyStudyItemList = ({
  auth: { user, loading },
  getMyItems,
  item: { items }
}) => {
  useEffect(() => {
    if (user !== null && user !== undefined) {
      getMyItems(user._id);
    }
  }, [getMyItems, user]);

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">My Study Items</h6>

      <p className="heading-underline" />
      {items !== null && items !== undefined ? (
        <ListGroup className="custom-list">
          <TransitionGroup className="item-list">
            {items.map(item =>
              item !== null ? (
                <CSSTransition key={item._id} timeout={700} classNames="fade">
                  <StudyItem key={item._id} item={item} />
                </CSSTransition>
              ) : (
                <Spinner />
              )
            )}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <h6 className="x-small-heading">Create a Study Item first...</h6>
  );
};

MyStudyItemList.propTypes = {
  getMyItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getMyItems })(MyStudyItemList);
