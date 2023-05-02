import { combineReducers } from "redux";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";
import asyncReducer from "../async/asyncReducer";

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    async: asyncReducer
})

export default rootReducer;