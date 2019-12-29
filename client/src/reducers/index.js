import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import logReducer from "./logReducer";
import fieldReducer from "./fieldReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import documentReducer from "./documentReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  item: itemReducer,
  log: logReducer,
  field: fieldReducer,
  profile: profileReducer,
  document: documentReducer
});
