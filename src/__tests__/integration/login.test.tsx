import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { LoginForm } from "components/forms/LoginForm";
import EmailInput from "components/inputs/EmailInput";
import { Form } from "react-final-form";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe("Login form behavior", () => {
  const store = mockStore({
    tasksState: {
      availableTasks: [],
    },
    projectsState: {
      projects: [],
    },
  });
  it("validate user input and submit form", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    // change email input value to valid email
    fireEvent.change(screen.getByTestId("emailInput"), {
      target: {
        value: "",
      },
    });
    fireEvent.change(screen.getByTestId("inputUtil"), {
      target: {
        value: "",
      },
    });
    act(() => {
      fireEvent.submit(screen.getByTestId("loginFormSubmit"));
    });
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
  it("validate user input and submit form", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>

          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    // change email input value to valid email
    fireEvent.change(screen.getByTestId("emailInput"), {
      target: {
        value: "test@mailinator.com",
      },
    })
    fireEvent.change(screen.getByTestId("inputUtil"), {
      target: {
        value: "Test123",
      },
    })
    act(() => {
      fireEvent.submit(screen.getByTestId("loginFormSubmit"));
    }
    );
    expect(screen.queryByText("Required field")).not.toBeInTheDocument();
    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });
});
