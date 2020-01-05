import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Collapse } from "reactstrap";

import ChapterModal from "../documents/document-input/ChapterModal";
import TestList from "../documents/document-lists/TestList";

const StudyNav = ({ auth, item: { item } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chap, setChap] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const sloggle = () => setChap(!chap);

  return (
    <nav className="studypage-nav">
      <Button onClick={toggle}>Documentation</Button>
      <Collapse isOpen={isOpen}>
        <ul>
          {auth.user._id === item.user ? (
            <ul>
              <li>
                <Button>
                  <ChapterModal />
                </Button>
              </li>
              {Object.keys(item.documentation.chapters).length > 0 ? (
                <li>
                  <Button>
                    <Link to="/item-add-document" style={{ color: "white" }}>
                      Add a Document
                    </Link>
                  </Button>
                </li>
              ) : null}
            </ul>
          ) : null}
          <div>
            <Button onClick={sloggle}>
              <Link
                to={`/api/chapters/${item._id}/chapters`}
                style={{ color: "white" }}
              >
                Chapters
              </Link>
            </Button>
            {/* <TestList /> */}

            {/* <Collapse isOpen={chap}>
              <ul>
                {item.documentation.chapters.map(chapter => (
                  <li key={chapter}>{chapter}</li>
                ))}
              </ul>
            </Collapse> */}
          </div>
        </ul>
      </Collapse>
    </nav>
  );
};

StudyNav.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps)(StudyNav);
