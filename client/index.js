// Import required modules.
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Import App file.
import App from './App';

// High-order function 'render()' that uses 'Component' to extend its funcionality. It wraps up 'ReactDOM.render(). This allows us to use Hot Module Replacement.
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// HMR.
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp)
  });
}