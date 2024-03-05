import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import fetch from "node-fetch";
import PolicySearch from "pages/policy/PolicySearch";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});