import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { ListGroup, Spinner, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getItems } from "../../actions/ItemState";
import StudyItem from "./StudyItem";

const StudyList = ({ getItems, item: { items, loading }, showAll }) => {
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

  return items.length !== 0 ? (
    <Container>
      {!showAll ? (
        <h3 className="text-center small-heading">Your study items</h3>
      ) : (
        <h3 className="text-center small-heading">
          Recently added study items
        </h3>
      )}

      <p className="heading-underline" />
      {items !== null && !loading ? (
        <ListGroup>
          {/* Shows a list of study items */}
          <TransitionGroup className="custom-list">
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <StudyItem key={item._id} item={item} showAll={showAll} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Loading...
        </Spinner>
      )}
    </Container>
  ) : (
    <Fragment>
      <h3 className="x-small-heading">
        Add a Study Item to show what you are studying
      </h3>
    </Fragment>
  );
};

StudyList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  showAll: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(StudyList);
