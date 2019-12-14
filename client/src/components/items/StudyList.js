import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container } from "reactstrap";
import { connect } from "react-redux";

import { getItems } from "../../actions/ItemState";
import StudyItem from "./StudyItem";
import Spinner from "../../background/Spinner";

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

  return items.length !== 0 ? (
    <Container>
      <h6 className="text-center small-heading">Recently added study items</h6>

      <p className="heading-underline" />
      {items !== null && items !== undefined && !loading ? (
        <ListGroup className="custom-list">
          {/* Shows a list of study items */}

          {items.map(item =>
            item !== null ? (
              <StudyItem key={item._id} item={item} items={items} />
            ) : (
              <Spinner />
            )
          )}
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <h6 className="x-small-heading">
      Add a Study Item to show what you are studying
    </h6>
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
