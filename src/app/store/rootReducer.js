import { combineReducers } from "redux";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import auditReducer from "../../features/audits/auditReducer";

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    async: asyncReducer,
    modals: modalReducer,
    auth: authReducer,
    audit: auditReducer,
})

export default rootReducer;