import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container, Button } from "reactstrap";
import { connect } from "react-redux";

import StudyItem from "../../items/StudyItem";
import ItemModal from "../../items/item-input/ItemModal";
import { textTrimmer } from "../../../helpers/text";
import Spinner from "../../../background/Spinner";

const ProfileStudyList = ({
  item: { user_items, loading },
  profile: {
    profile: { user }
  },
  auth
}) => {
  if (
    user_items === null &&
    user_items === undefined &&
    Object.keys(user_items).length === 0
  ) {
    return (
      <div>
        <p>Please add a study item....</p>
      </div>
    );
  }

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">
        {textTrimmer(user.name)}s Current Studies
      </h6>

      <p className="heading-underline" />

      {auth.user._id === user._id ? (
        <Button className="btn draw-border">
          <ItemModal user={user} />
        </Button>
      ) : null}

      <ListGroup className="study-list">
        {user_items.map(item => (
          <StudyItem className="study-list-item" key={item._id} item={item} />
        ))}
      </ListGroup>
    </Container>
  ) : (
    <Spinner />
  );
};

ProfileStudyList.propTypes = {
  item: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileStudyList);
