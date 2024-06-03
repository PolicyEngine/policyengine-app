import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import postJson from "../posts/posts.json";

import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

jest.mock("react-plotly.js", () => jest.fn());

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

const { location } = window;

beforeAll(async () => {
  window.scrollTo = jest.fn();

  delete window.location;
  window.location = {
    reload: jest.fn(),
  };
});

afterAll(() => {
  window.location = location;
  jest.resetAllMocks();
});

describe("Test main PolicyEngine component", () => {
  test("Renders for US if proper data passed", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByText("Computing Public Policy for Everyone"),
    ).toBeInTheDocument();
    expect(getByText("Trusted across the US")).toBeInTheDocument();
  });
  test("Renders for UK if proper data passed", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk",
      origin: "https://www.policyengine.org/uk",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByText("Computing Public Policy for Everyone"),
    ).toBeInTheDocument();
    expect(getByText("Trusted across the UK")).toBeInTheDocument();
  });
  test("Routes to auth callback", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/callback",
      origin: "https://www.policyengine.org/callback",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(queryByText("Follow us on social media")).not.toBeInTheDocument();
  });
  test("Routes to about page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/about",
      origin: "https://www.policyengine.org/us/about",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Our people")).toBeInTheDocument();
  });
  test("Routes to jobs page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/jobs",
      origin: "https://www.policyengine.org/uk/jobs",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Join Our Team")).toBeInTheDocument();
  });
  test("Routes to testimonials page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/testimonials",
      origin: "https://www.policyengine.org/us/testimonials",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("What people say about PolicyEngine")).toBeInTheDocument();
  });
  test("Routes to calculator interstitial page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/calculator",
      origin: "https://www.policyengine.org/uk/calculator",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Choose a calculator")).toBeInTheDocument();
  });
  test("Routes to research page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/research",
      origin: "https://www.policyengine.org/us/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("us")).toBeInTheDocument();
  });
  test("Routes to research page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/research",
      origin: "https://www.policyengine.org/uk/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("uk")).toBeInTheDocument();
  });
  test("Routes to donate page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/donate",
      origin: "https://www.policyengine.org/uk/donate",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("The Difference Your Support Makes")).toBeInTheDocument();
  });

  // This test only ensures that the JS page renders, not that markdown is transformed,
  // as markdown files are stubbed out in our current implementation of Jest.
  // Processing markdown properly, which should be done to test blog files,
  // would likely require a custom webpack setup.
  test("Routes to individual blog posts for US", () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve("success"),
      }),
    );

    // Filter posts.json for US articles
    const filteredPostJson = postJson.filter((post) =>
      post.tags.includes("us"),
    );

    // Choose one at random
    const randIndex = Math.floor(Math.random() * filteredPostJson.length);

    const selectedPost = filteredPostJson[randIndex];
    const postFilepath = selectedPost.filename.split(".")[0];
    console.log(postFilepath);

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: `/us/research/${postFilepath}`,
      origin: `https://www.policyengine.org/us/research/${postFilepath}`,
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /Research/i });
    expect(link).toBeInTheDocument();
  });
  test("Routes to privacy page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/privacy",
      origin: "https://www.policyengine.org/uk/privacy",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Privacy")).toBeInTheDocument();
  });
  test("Routes to T&C page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/terms",
      origin: "https://www.policyengine.org/us/terms",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Terms of Service")).toBeInTheDocument();
  });
  // Note: This test only determines if routing occurs;
  // more detailed testing should be done for the component
  // itself
  test("Routes to household page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/household",
      origin: "https://www.policyengine.org/us/household",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      queryByText("Computing Public Policy for Everyone"),
    ).not.toBeInTheDocument();
  });
  // Note: This test only determines if routing occurs;
  // more detailed testing should be done for the component
  // itself
  test("Routes to policy page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/policy",
      origin: "https://www.policyengine.org/uk/policy",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      queryByText("Computing Public Policy for Everyone"),
    ).not.toBeInTheDocument();
  });
  test("Routes to user profile page if supplied with a user ID for UK", () => {
    const testUserId = "1";

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: `/uk/profile/${testUserId}`,
      origin: `https://www.policyengine.org/uk/profile/${testUserId}`,
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Profile")).toBeInTheDocument();
  });
  test("Routes to API documentation page for US", () => {
    // This test uses node-fetch to actually fetch country metadata,
    // but can't use fetch to fetch the API component's sample data,
    // and since it's not possible to conditionally polyfill fetch,
    // this is a better way of silencing the inevitable 404 error
    jest.spyOn(console, "error").mockImplementation(() => {});

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/api",
      origin: "https://www.policyengine.org/us/api",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("PolicyEngine API Documentation")).toBeInTheDocument();
  });
  test("Routes to TRAFWA calculator", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/trafwa-ctc-calculator",
      origin: "https://www.policyengine.org/us/trafwa-ctc-calculator",
    };

    const { getByTitle } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByTitle("TRAFWA Child Tax Credit Calculator"),
    ).toBeInTheDocument();
  });
  test("Routes to Citizens Economic Council page", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/cec",
      origin: "https://www.policyengine.org/uk/cec",
    };

    const { getByTitle } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByTitle("Citizens' Economic Council reform simulator"),
    ).toBeInTheDocument();
  });
});
