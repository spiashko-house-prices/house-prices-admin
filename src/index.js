import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import housePricesAdminApp from './reducers/reducers';
import {Provider} from 'react-redux';

export let store = createStore(housePricesAdminApp);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
