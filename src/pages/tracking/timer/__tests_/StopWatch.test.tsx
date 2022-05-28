
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { StopWatch } from 'pages/tracking/timer/StopWatch';
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)


describe('StopWatch', () => {
  global.URL.createObjectURL = jest.fn();
  it('renders without crashing', () => {
    const testTime = 0;
    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <StopWatch time={testTime} />
        </BrowserRouter>
      </Provider>
    );
    // renders without crashing
    expect(screen.getByTestId('stopWatch')).toBeInTheDocument();
  });
});
