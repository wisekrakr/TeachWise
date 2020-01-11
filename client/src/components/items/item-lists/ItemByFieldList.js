import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container } from "reactstrap";
import { connect } from "react-redux";

import { getItemsByField } from "../../../actions/ItemState";
import StudyItem from "../StudyItem";
import Spinner from "../../../background/Spinner";

const ItemsByField = ({
  match,
  getItemsByField,
  item: { fieldItems, loading }
}) => {
  useEffect(() => {
    getItemsByField(match.params.id);
  }, [getItemsByField, match.params.id]);

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">Study Items in this Field </h6>
      <p className="heading-underline" />
      <ListGroup className="custom-list">
        {fieldItems.map(item =>
          item !== null ? <StudyItem key={item._id} item={item} /> : <Spinner />
        )}
      </ListGroup>
    </Container>
  ) : (
    <Spinner />
  );
};

ItemsByField.propTypes = {
  getItemsByField: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItemsByField })(ItemsByField);
