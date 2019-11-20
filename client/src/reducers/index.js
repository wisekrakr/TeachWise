import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import logReducer from "./logReducer";
import fieldReducer from "./fieldReducer";

export default combineReducers({
  item: itemReducer,
  log: logReducer,
  field: fieldReducer
});
