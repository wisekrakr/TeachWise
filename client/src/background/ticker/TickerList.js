import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";

import { getItems } from "../../actions/ItemState";
import TickerItem from "./TickerItem";

const TickerList = ({ getItems, item: { items, loading } }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div>
      <div className="ticker-wrap">
        <div className="ticker">
          {items !== null && !loading ? (
            items.map(item => <TickerItem key={item._id} item={item} />)
          ) : (
            <Spinner color="primary" style={{ width: "3rem", height: "3rem" }}>
              Loading...
            </Spinner>
          )}
        </div>
      </div>
    </div>
  );
};

TickerList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(TickerList);
