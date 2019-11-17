import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import itemContext from "../../contexts/items/itemContext";

import StudyItem from "./StudyItem";

const StudyList = () => {
  const context = useContext(itemContext);
  const { items, getItems, loading } = context;

  useEffect(() => {
    getItems();
  }, []);

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

export default StudyList;
