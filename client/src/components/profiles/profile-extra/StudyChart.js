import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";

const StudyChart = ({
  item: {
    item: { user }
  },
  profile: {
    profile: { user }
  }
}) => {
  const initialState = {
    labels: ["Study Items", "Fields of Study", "Log Entries"],
    datasets: [
      {
        data: [
          user.metadata.item_count.length,
          user.metadata.field_count.length,
          user.metadata.log_count.length
        ],
        backgroundColor: ["red", "blue", "orange"]
      }
    ]
  };

  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({ responsive: true });
  }, [setOptions]);

  return (
    <div>
      <Pie data={state} options={options} />
    </div>
  );
};

StudyChart.propTypes = {
  item: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  item: state.item,
  profile: state.profile
});

export default connect(mapStateToProps)(StudyChart);
