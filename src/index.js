import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';
import store from './Store/store';
import './index.css';
import ChangeMode from './utils/ChangeMode';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChangeMode>
          <App />
        </ChangeMode>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
