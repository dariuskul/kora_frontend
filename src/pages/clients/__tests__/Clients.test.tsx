import { Clients } from '../Clients';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

test('renders without crashing', () => {
  const store = mockStore({
    clientsState: {
      clients: [],
    },
  })
  render(
    <Provider store={store}>
      <Clients />
    </Provider>
  );
  // renders without crashing
  expect(screen.getByText('Clients')).toBeInTheDocument();
}
)
test('button is clickable', () => {
  const store = mockStore({
    clientsState: {
      clients: [],
    },
  })
  render(
    <Provider store={store}>
      <Clients />
    </Provider>
  );
  // button is clickable
  expect(screen.getByRole('button', { name: 'Create new client' })).toBeInTheDocument();
  // click button
}
)

test('when button is clicked, modal is open', () => {
  const store = mockStore({
    clientsState: {
      clients: [],
    },
  })
  render(
    <Provider store={store}>
      <Clients />
    </Provider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Create new client' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
}
)

test('when clients are fetched, table is populated', () => {
  const store = mockStore({
    clientsState: {
      clients: [{ id: 1, name: 'Client 1' }, { id: 2, name: 'Client 2' }],
    },
  })
  render(
    <Provider store={store}>
      <Clients />
    </Provider>
  );
  expect(screen.getByText('Client 1')).toBeInTheDocument();
  expect(screen.getByText('Client 2')).toBeInTheDocument();
}
)

test('when clients are empty table is not rendered', () => {
  const store = mockStore({
    clientsState: {
      clients: [],
    },
  })
  render(
    <Provider store={store}>
      <Clients />
    </Provider>
  );
  expect(screen.queryByText('Client 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Client 2')).not.toBeInTheDocument();
}
)

