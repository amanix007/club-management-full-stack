import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import store from './store';

afterEach(cleanup)

test('App rendering correctly', () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const mainWrapper = app.getByTestId('main_tag');

  expect(mainWrapper).toBeInTheDocument();

});


