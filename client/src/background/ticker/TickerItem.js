import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

const TickerItem = ({ item: { _id, name, field_of_study, date } }) => {
  return (
    <Link to={`/api/items/${_id}`}>
      <div className="ticker-item" id="ticker-item">
        <Moment fromNow>{date}</Moment>&nbsp;:&nbsp;
        {name}
        &nbsp;
        <sub>in the field of </sub>
        {field_of_study.name}
      </div>
    </Link>
  );
};

TickerItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default connect(null, null)(TickerItem);
