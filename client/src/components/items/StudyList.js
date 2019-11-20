import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ListGroup, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getItems } from "../../actions/ItemState";
import StudyItem from "./StudyItem";

const StudyList = ({ getItems, item: { items, loading } }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  if (
    items === null &&
    items === undefined &&
    Object.keys(items).length === 0
  ) {
    return (
      <div>
        <p>Please add a study item....</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center small-heading">Your study items</h3>
      <p className="heading-underline" />
      {items !== null && !loading ? (
        <ListGroup>
          {/* Shows a list of study items */}
          <TransitionGroup className="custom-list">
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <StudyItem key={item._id} item={item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Loading...
        </Spinner>
      )}
    </div>
  );
};

StudyList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(StudyList);
