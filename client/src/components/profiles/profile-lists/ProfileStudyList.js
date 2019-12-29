import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container, Button } from "reactstrap";
import { connect } from "react-redux";

import StudyItem from "../../items/StudyItem";
import ItemModal from "../../items/item-input/ItemModal";
import { textTrimmer } from "../../../helpers/text";
import Spinner from "../../../background/Spinner";

const ProfileStudyList = ({ items, user }) => {
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
      <h6 className="text-center small-heading">
        {textTrimmer(user.name)}s Current Studies
      </h6>

      <p className="heading-underline" />
      {items !== null && user !== null ? (
        <ListGroup className="study-list">
          {items.map(item => (
            <StudyItem className="study-list-item" key={item._id} item={item} />
          ))}
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <div className="narrow">
        <h6 className="x-small-heading">
          Add a Study Item to show what you are studying
        </h6>
        <Button className="btn draw-border">
          <ItemModal user={user} />
        </Button>
      </div>
    </Fragment>
  );
};

ProfileStudyList.propTypes = {
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps)(ProfileStudyList);
