// CenteredMiddleColumn.test.js
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CenteredMiddleColumn from "../../../src/layout/CenteredMiddleColumn.jsx";

describe("CenteredMiddleColumn", () => {
  test("renders title", () => {
    const { getByText } = render(<CenteredMiddleColumn title="Test Title" />);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  test("renders description label by default when description is provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(getByText("Description")).toBeInTheDocument();
  });

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

  test("renders children when provided", () => {
    const { getByText } = render(
      <CenteredMiddleColumn title="Test Title">
        <div>Child Element</div>
      </CenteredMiddleColumn>,
    );
    expect(getByText("Child Element")).toBeInTheDocument();
  });
});
