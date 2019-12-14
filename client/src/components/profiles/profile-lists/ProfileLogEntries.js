import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ListGroup, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import LogEntry from "../../logs/LogEntry";
import { textTrimmer } from "../../../helpers/text";
import Spinner from "../../../background/Spinner";

const ProfileLogEntries = ({ logs, user }) => {
  if (logs === null && logs === undefined && Object.keys(logs).length === 0) {
    return (
      <div>
        <p>Please Enter into Log....</p>
      </div>
    );
  }

  console.log(logs);

  return logs.length !== 0 ? (
    <Container>
      <h6 className="text-center small-heading">
        {textTrimmer(user.name)}s Log Entries
      </h6>

      <p className="heading-underline" />
      {logs !== null && user !== null ? (
        <ListGroup>
          {/* Shows a list of study items */}
          <TransitionGroup className="custom-list">
            {logs.map(log => (
              <CSSTransition key={log._id} timeout={500} classNames="fade">
                <LogEntry key={log._id} log={log} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner />
      )}
    </Container>
  ) : (
    <Fragment>
      <h6 className="x-small-heading">
        Please enter what you are thinking into a log...
      </h6>
    </Fragment>
  );
};

ProfileLogEntries.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps)(ProfileLogEntries);
