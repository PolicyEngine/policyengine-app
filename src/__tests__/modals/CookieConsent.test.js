import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CookieConsent from '../../modals/CookieConsent';

describe('CookieConsent Component', () => {
  beforeEach(() => {
    // Clear any previous cookies before each test
    document.cookie = 'consent=; Max-Age=-99999999;';
  });

  test('Pop-up appears without cookie existing', async () => {
    render(<CookieConsent />);
    
    // Wait for the popup to show up
    await waitFor(() => {
      expect(screen.getByTestId('cookie-consent-popup')).toBeInTheDocument();
    });

    // Check if the text is present
    expect(
      screen.getByText('This site uses cookies to improve your experience. Do you accept?')
    ).toBeInTheDocument();
  });

  test('Pop-up does not appear if cookies have been accepted', () => {
    // Set the consent cookie before rendering
    document.cookie = 'consent=granted';

    render(<CookieConsent />);

    // Check that the popup doesn't appear
    expect(screen.queryByTestId('cookie-consent-popup')).not.toBeInTheDocument();
  });

  test('Accept button sets the cookie and closes the popup', async () => {
    render(<CookieConsent />);

    // Wait for the popup to show up
    await waitFor(() => {
      expect(screen.getByTestId('cookie-consent-popup')).toBeInTheDocument();
    });

    // Click the Accept button
    fireEvent.click(screen.getByTestId('accept-cookies-button'));

    // Wait for the popup to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('cookie-consent-popup')).not.toBeInTheDocument();
    });

    // Check that the cookie is set
    expect(document.cookie).toContain('consent=granted');
  });

  test('Decline button closes the popup without setting a cookie', async () => {
    render(<CookieConsent />);

    // Wait for the popup to show up
    await waitFor(() => {
      expect(screen.getByTestId('cookie-consent-popup')).toBeInTheDocument();
    });

    // Click the Decline button
    fireEvent.click(screen.getByTestId('decline-cookies-button'));

    // Wait for the popup to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('cookie-consent-popup')).not.toBeInTheDocument();
    });

    // Check that no consent cookie is set
    expect(document.cookie).not.toContain('consent=granted');
  });
});