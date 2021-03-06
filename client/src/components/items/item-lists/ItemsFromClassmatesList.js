import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup, Container } from "reactstrap";
import { connect } from "react-redux";

import { getItemsFromClassmates } from "../../../actions/ItemState";
import StudyItem from "../StudyItem";
import Spinner from "../../../background/Spinner";

const ItemsFromClassmatesList = ({
  auth: { user, loading },
  getItemsFromClassmates,
  item: { classmates_items }
}) => {
  useEffect(() => {
    if (user !== null && user !== undefined) {
      getItemsFromClassmates(user._id);
    }
  }, [getItemsFromClassmates, user]);

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">
        Recently added study items from classmates
      </h6>

      <p className="heading-underline" />
      {classmates_items !== null && classmates_items !== undefined ? (
        <ListGroup className="custom-list">
          <TransitionGroup className="item-list">
            {classmates_items.map(item =>
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
    <h6 className="x-small-heading">
      Follow someone and see what they are studying right here!
    </h6>
  );
};

ItemsFromClassmatesList.propTypes = {
  getItemsFromClassmates: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItemsFromClassmates })(
  ItemsFromClassmatesList
);
