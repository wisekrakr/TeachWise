import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Spinner } from "reactstrap";

import LogEntry from "./LogEntry";
import { getLogs } from "../../actions/LogState";

const LogEntryList = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (logs === null && logs === undefined && Object.keys(logs).length === 0) {
    return (
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    );
  }

  return (
    <Fragment>
      <h3 className="text-center small-heading">Your Log Entries</h3>
      <p className="heading-underline" />
      {logs !== null && !loading ? (
        <ListGroup>
          {logs.map(log => (
            <LogEntry key={log._id} log={log} />
          ))}
        </ListGroup>
      ) : (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
          Please add a log entry....
        </Spinner>
      )}
    </Fragment>
  );
};

LogEntryList.prototypes = {
  getLogs: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(LogEntryList);
