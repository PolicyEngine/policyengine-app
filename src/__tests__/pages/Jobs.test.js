import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PolicyEngine from '../../PolicyEngine';

// Mock the fetch API calls
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    console.log(`Mocked fetch URL: ${url}`); // Debugging log

    if (url.includes('/metadata')) {
      console.log('Returning mocked /metadata response');
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          variables: { /* Mocked variables data */ key1: 'value1', key2: 'value2' }, // Add variables structure here
        }),
      });
    } else if (url.includes('/jobOpenings')) {
      console.log('Returning mocked /jobOpenings response');
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            title: "UK Research Associate",
            type: "Full-Time",
            content: {
              summary: "Shaping the future of economic policy analysis",
              location: "UK-based (Remote, with preference for 1 day per week in London office)",
              contract: "Full-time, starting as early as possible through September 30, 2025, with possibility of extension",
              description: "PolicyEngine is seeking a talented and motivated Research Associate to join our UK team...",
              responsibilities: [
                "Expand the UK Tax-Benefit Rules Engine",
                "Training and Community Engagement",
                "Policy Analysis",
                "Local Area Disaggregation",
                "Model Validation and Accuracy",
                "Beta Testing and User Feedback",
                "User-Centric Enhancements and AI Integration",
                "Documentation and Reporting",
              ],
              qualifications: "Bachelor's degree in economics, computer science, public policy, or related fields...",
              benefits: "Impactful work, innovative environment, professional growth, collaborative team...",
            },
          },
          {
            title: "Software Engineering Intern",
            type: "Internship",
            content: {
              summary: "Developing accessible policy analysis tools",
              location: "Remote (US-based preferred)",
              duration: "Spring, Summer, or Fall semester",
              description: "As a Software Engineering Intern at PolicyEngine, you will contribute to making policy analysis tools more accessible...",
              responsibilities: [
                "Develop and enhance Python libraries",
                "Build new applications using emerging technologies like generative AI",
                "Work on React-based front-end in the policyengine-app repo",
                "Contribute to Flask/Python back-end development in the policyengine-api and policyengine-core libraries",
                "Develop and review code collaboratively in GitHub",
              ],
              qualifications: "Currently pursuing a degree in Computer Science or related field; proficiency in Python and JavaScript...",
              benefits: "Paid stipend, flexible remote work, mentorship from experienced developers...",
            },
          },
        ]),
      });
    }
  });
});

// Clear mocks after each test
afterEach(() => {
  global.fetch.mockClear();
});

test("Routes to jobs page for UK and displays job listings", async () => {
  render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>
  );

  // Debugging logs
  console.log("Waiting for the UK Research Associate job listing to appear...");

  // Wait for the job listings to appear and check if the expected job titles are rendered
  const jobTitle1 = await screen.findByText(/UK Research Associate/i);
  expect(jobTitle1).toBeInTheDocument();

  const jobTitle2 = await screen.findByText(/Software Engineering Intern/i);
  expect(jobTitle2).toBeInTheDocument();
});