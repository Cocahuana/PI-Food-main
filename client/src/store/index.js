import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

   const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/*Middleware: hace referencia a código que existe entre dos capas de software, en el caso de express a código que este entre el request y el response. */

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)