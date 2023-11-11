import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css'
import App from './components/app/App';
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./services/reducers";


const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    // @ts-ignore
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
