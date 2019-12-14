import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItems } from "../../actions/ItemState";
import TickerItem from "./TickerItem";
import Spinner from "../Spinner";

const TickerList = ({ getItems, item: { items, loading } }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div>
      <div className="ticker-wrap">
        <div className="ticker">
          {items !== null && !loading ? (
            items.map(item =>
              item !== null ? <TickerItem key={item._id} item={item} /> : ""
            )
          ) : (
            <Spinner />
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
