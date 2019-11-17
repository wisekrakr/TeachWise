import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "reactstrap";

import logContext from "../../contexts/logs/logContext";
import { textTruncate } from "../../helpers/TextHelper";

const LogEntry = ({ log }) => {
  const context = useContext(logContext);
  const { deleteLogEntry } = context;

  const { _id, name, date } = log;

  const onDelete = () => {
    deleteLogEntry(_id);
  };

  return (
    <div className="list-group">
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
  );
};

export default LogEntry;
