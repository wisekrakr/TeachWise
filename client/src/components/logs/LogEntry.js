import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "reactstrap";

import { deleteLogEntry, deleteUserLog } from "../../actions/LogState";
import { textTruncate } from "../../helpers/textHelper";

const LogEntry = ({
  auth,
  deleteLogEntry,
  deleteUserLog,
  log: { _id, user, name, date }
}) => {
  const onDelete = () => {
    deleteLogEntry(_id);
    deleteUserLog(user, _id);
  };

  return (
    !auth.loading &&
    user === auth.user._id && (
      <div className="custom-list list-group">
        <div className="log-list-item" style={{ background: "transparant" }}>
          <div>
            <Moment format="YYYY-MM-DD HH:mm" className=" float-left m-3">
              {date}
            </Moment>
          </div>

          <Button className="btn list-delete btn-sm" onClick={onDelete}>
            <i className="fas fa-times" />
          </Button>

          <Link to={`/api/logs/${_id}`}>
            <div className="custom-list-item font-weight-bolder">
              {textTruncate(name, 20)}
            </div>{" "}
          </Link>
        </div>
      </div>
    )
  );
};

LogEntry.prototypes = {
  log: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteLogEntry: PropTypes.func.isRequired,
  deleteUserLog: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteLogEntry, deleteUserLog })(
  LogEntry
);
