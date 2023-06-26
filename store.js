
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import measureMiddleware from "./src/middlewares/measure";
import changeDayMiddleware from "./src/middlewares/changeDay";

import rootReducer from "./src/reducers"

const initialState = {}
const middleware = [ changeDayMiddleware, thunk]
// console.log(middleware)

const store = createStore(rootReducer, initialState,
    compose(applyMiddleware(...middleware)))

export default store;