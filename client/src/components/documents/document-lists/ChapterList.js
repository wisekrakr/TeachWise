import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Container } from "reactstrap";

import { getChaptersByItem } from "../../../actions/DocumentState";
import ChapterItem from "../ChapterItem";
import Spinner from "../../../background/Spinner";

const ChapterList = ({
  getChaptersByItem,
  item: { item },
  document: { chapters, loading }
}) => {
  useEffect(() => {
    getChaptersByItem(item._id);
  }, [getChaptersByItem]);

  if (
    chapters === null &&
    chapters === undefined &&
    Object.keys(chapters).length === 0
  ) {
    return <Spinner />;
  }

  return !loading ? (
    <Container>
      <h6 className="text-center small-heading">
        Chapter List for {item.name}
      </h6>

      <p className="heading-underline" />
      <ListGroup className="custom-list">
        {chapters.map(chapter => (
          <ChapterItem key={chapter._id} chapter={chapter} />
        ))}
      </ListGroup>
    </Container>
  ) : (
    <Spinner />
  );
};

ChapterList.prototypes = {
  getChaptersByItem: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  document: state.document,
  item: state.item
});

export default connect(mapStateToProps, { getChaptersByItem })(ChapterList);
