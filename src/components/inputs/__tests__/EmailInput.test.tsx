import { fireEvent, render, screen } from "@testing-library/react";
import EmailInput from "components/inputs/EmailInput";
import { Form } from "react-final-form";
import '@testing-library/jest-dom'

// make a test cases for EmailInput component, test if validation is working
test('emailInput is not valid', () => {
  // test react-final-form validation on EmailInput component
  const { getByTestId } = render(
    <Form
      onSubmit={() => { }}
      render={() => (
        <EmailInput
          id="email"
        />
      )}
    />
  );
  // change email input value to valid email
  fireEvent.change(screen.getByTestId("emailInput"), {
    target: {
      value: "test@m",
    },
  });
  fireEvent.blur(screen.getByTestId("emailInput"));
  expect(screen.getByText("Wrong email address")).toBeInTheDocument();
});