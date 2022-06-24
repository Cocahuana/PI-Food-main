import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) ||
   compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)