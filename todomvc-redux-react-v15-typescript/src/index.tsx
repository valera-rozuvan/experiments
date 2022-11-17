import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Store,
  createStore,
} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import {AppState} from './stateManagement/model';
import {rootReducer} from './stateManagement';

const store: Store<AppState> = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
