import {fireEvent, render} from '@testing-library/react';

import Button from 'controls/Button';
import LinkButton from 'controls/LinkButton';

jest.mock("react-plotly.js", () => jest.fn());

describe("Test button types", () => {
  test("Test that Button renders and fires onClick properly");
  test("Test that LinkButton renders properly");
  test("Test that LinkButton properly navigates to a passed link");
});