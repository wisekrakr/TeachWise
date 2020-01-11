import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItemsFromClassmates } from "../../actions/ItemState";
import TickerItem from "./TickerItem";
import Spinner from "../Spinner";

const TickerList = ({
  auth: { user },
  getItemsFromClassmates,
  item: { items, loading }
}) => {
  useEffect(() => {
    if (user !== null) {
      getItemsFromClassmates(user._id);
    }
  }, [getItemsFromClassmates, user]);

  return (
    user !== null && (
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
    )
  );
};

TickerList.propTypes = {
  getItemsFromClassmates: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItemsFromClassmates })(TickerList);
