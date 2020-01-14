import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container } from "reactstrap";
import { connect } from "react-redux";

import { getItemsByName } from "../../../actions/ItemState";
import StudyItem from "../StudyItem";
import Spinner from "../../../background/Spinner";

const ItemsByName = ({
  match,
  getItemsByName,
  item: { named_items, loading }
}) => {
  useEffect(() => {
    getItemsByName(match.params.id);
  }, [getItemsByName, match.params.id]);

  if (
    named_items === null &&
    named_items === undefined &&
    Object.keys(named_items).length === 0
  ) {
    return (
      <div>
        <p>Please add a study item....</p>
      </div>
    );
  }

  return named_items.length !== 0 ? (
    <Container>
      <h6 className="text-center small-heading">Recently added study items</h6>

      <p className="heading-underline" />
      {named_items !== null && named_items !== undefined && !loading ? (
        <ListGroup className="custom-list">
          {/* Shows a list of study items */}

          {named_items.map(item =>
            item !== null ? (
              <StudyItem key={item._id} item={item} />
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

ItemsByName.propTypes = {
  getItemsByName: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItemsByName })(ItemsByName);
