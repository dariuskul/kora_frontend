import { Reports } from '../Reports';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { SystemReport } from 'pages/reports/components/pages/systemReport/SystemReport';
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

test('renders without crashing', () => {
  render(<BrowserRouter><SystemReport /></BrowserRouter>);
  // renders without crashing
  expect(screen.getByText('Employee performance report')).toBeInTheDocument();
}
)