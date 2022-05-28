import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { Projects } from "pages/tracking/project/Projects";
import { BrowserRouter } from "react-router-dom";
const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe("Projects", () => {
  it("renders without crashing", () => {
    const store = mockStore({
      projectsState: {
        projects: [],
      },
      userState: {
        id: 1,
        name: "User 1",
      },
      clientsState: {
        clients: [],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      </Provider>
    );
  });
  it("shows projects list when projects are available", () => {
    const store = mockStore({
      projectsState: {
        projects: [
          {
            id: 1,
            name: "Project 1",
            tasks: [],
          },
          {
            id: 2,
            name: "Project 2",
            tasks: [],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });
});
