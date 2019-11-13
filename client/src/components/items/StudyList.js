import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Container, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import itemContext from "../../contexts/items/itemContext";
import StudyItem from "./StudyItem";

const StudyList = () => {
  const context = useContext(itemContext);
  const { items, getItems, filtered, loading } = context;

  useEffect(() => {
    getItems();
  }, []);

  console.log(items);

  if (
    items === null &&
    items === undefined &&
    Object.keys(items).length === 0
  ) {
    return (
      <Fragment>
        <p>Please add a study item....</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {items !== null && !loading ? (
        <Container>
          <ListGroup>
            {/* Shows a list of study items */}
            <TransitionGroup className="study-list">
              {items.map(item => (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem key={item._id}>
                    <StudyItem item={item} />
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Loading...
        </Spinner>
      )}
    </Fragment>
  );
};

export default StudyList;
