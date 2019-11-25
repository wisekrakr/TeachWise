import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Alert } from "reactstrap";

const AlertPopUp = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <Alert key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </Alert>
    ))
  );
};

AlertPopUp.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertPopUp);
