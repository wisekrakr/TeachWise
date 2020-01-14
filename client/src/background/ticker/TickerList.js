import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getItemsFromClassmates } from "../../actions/ItemState";
import TickerItem from "./TickerItem";
import Spinner from "../Spinner";

const TickerList = ({
  auth: { user, loading },
  getItemsFromClassmates,
  item: { classmates_items }
}) => {
  useEffect(() => {
    if (user !== null && user !== undefined) {
      getItemsFromClassmates(user._id);
    }
  }, [getItemsFromClassmates, user]);

  return (
    !loading && (
      <div>
        <div className="ticker-wrap">
          <div className="ticker">
            {classmates_items !== null && classmates_items !== undefined ? (
              classmates_items.map(item =>
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
