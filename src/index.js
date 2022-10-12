import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

import { UsersProvider } from './context/UsersProvider';
import { EventsProvider } from './context/EventsProvider';
import { FinanceProvider } from './context/FinanceProvider';

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <EventsProvider>
        <FinanceProvider>
          <Router>
            <App />
          </Router>
        </FinanceProvider>
      </EventsProvider>
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
