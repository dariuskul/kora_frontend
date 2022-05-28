import { Reports } from '../Reports';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

test('renders without crashing', () => {
  render(<BrowserRouter><Reports /></BrowserRouter>);
  // renders without crashing
  expect(screen.getByText('Reports')).toBeInTheDocument();
}
)