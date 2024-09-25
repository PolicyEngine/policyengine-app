// CenteredMiddleColumn.test.js
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CenteredMiddleColumn from "../../../src/layout/CenteredMiddleColumn.jsx";

describe("CenteredMiddleColumn", () => {
  // Test to check if the title is rendered correctly
  test("renders title", () => {
    const { getByText } = render(<CenteredMiddleColumn title="Test Title" />);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  // Test to check if the description is rendered when it is provided
  test("renders description when provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  // Test to check if the description label is rendered by default when a description is provided
  test("renders description label by default when description is provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(getByText("Description")).toBeInTheDocument();
  });

  // Test to check if the description label is not rendered when descriptionLabel is set to false
  test("does not render description label when descriptionLabel is false", () => {
    const { queryByText } = render(
      <CenteredMiddleColumn
        title="Test Title"
        description="Test Description"
        descriptionLabel={false}
      />,
    );
    expect(queryByText("Description")).not.toBeInTheDocument();
  });

  // Test to check if children elements are rendered correctly when provided
  test("renders children when provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn title="Test Title">
        <div>Child Element</div>
      </CenteredMiddleColumn>,
    );
    expect(getByText("Child Element")).toBeInTheDocument();
  });
});
