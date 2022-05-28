import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { Tasks } from 'pages/tasks/Tasks';
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)


describe('Tasks', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      tasksState: {
        availableTasks: [],
      },
      projectsState: {
        projects: [],
      },
      userState: {
        id: 1,
        name: 'User 1',
      },
      modalState: {
        timerEditModal: {
          open: false,
          data: null,
        },
        importTaskModal: {
          open: false,
          data: null,
        },
        editTaskModal: {
          open: false,
          data: null,
        },
      }

    })
    render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    // renders without crashing
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  })
  it('button is clickable', () => {
    const store = mockStore({
      tasksState: {
        availableTasks: [],
      },
      projectsState: {
        projects: [],
      },
      userState: {
        id: 1,
        name: 'User 1',
      },
      modalState: {
        timerEditModal: {
          open: false,
          data: null,
        },
        importTaskModal: {
          open: false,
          data: null,
        },
        editTaskModal: {
          open: false,
          data: null,
        },
      }
    })
    render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    // button is clickable
    expect(screen.getByRole('button', { name: 'Create new task' })).toBeInTheDocument();
    // click button
    fireEvent.click(screen.getByRole('button', { name: 'Create new task' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  })
  it('when data is fetched, table is populated', () => {
    const store = mockStore({
      tasksState: {
        availableTasks: [{ id: 1, description: 'Task 1' }, { id: 2, description: 'Task 2' }],
      },
      projectsState: {
        projects: [],
      },
      userState: {
        id: 1,
        name: 'User 1',
      },
      modalState: {
        timerEditModal: {
          open: false,
          data: null,
        },
        importTaskModal: {
          open: false,
          data: null,
        },
        editTaskModal: {
          open: false,
          data: null,
        },
      }
    });
    render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    // table is populated
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
})