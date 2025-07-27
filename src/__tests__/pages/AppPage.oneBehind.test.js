/**
 * This test demonstrates the "one behind" issue with OBBBA URL synchronization
 *
 * The problem: When clicking households in the iframe, the parent URL updates
 * but shows the PREVIOUS household ID, not the current one.
 *
 * Root cause: The iframe is sending its OLD state in the postMessage before
 * updating its own internal state.
 */

describe("OBBBA 'One Behind' Issue", () => {
  it("demonstrates the problem", () => {
    // Simulate what's happening:
    const iframeInternalState = { household: "initial" };
    const parentUrlHistory = [];

    // Function to simulate iframe behavior (problematic version)
    const simulateIframeClick_PROBLEMATIC = (newHousehold) => {
      // 1. User clicks, iframe sends message with CURRENT (old) state
      parentUrlHistory.push(iframeInternalState.household);

      // 2. THEN iframe updates its own state
      iframeInternalState.household = newHousehold;

      console.log(`After clicking ${newHousehold}:`);
      console.log(`  Iframe shows: ${iframeInternalState.household}`);
      console.log(
        `  Parent URL shows: ${parentUrlHistory[parentUrlHistory.length - 1]}`,
      );
      console.log(
        `  One behind? ${iframeInternalState.household !== parentUrlHistory[parentUrlHistory.length - 1]}`,
      );
    };

    // Simulate user interactions
    console.log("\n=== PROBLEMATIC BEHAVIOR (what's happening now) ===");
    simulateIframeClick_PROBLEMATIC("12345");
    simulateIframeClick_PROBLEMATIC("67890");
    simulateIframeClick_PROBLEMATIC("99999");

    // Verify the "one behind" pattern
    expect(parentUrlHistory).toEqual(["initial", "12345", "67890"]);
    expect(iframeInternalState.household).toBe("99999");

    // The parent is showing "67890" but iframe is showing "99999"!
    expect(parentUrlHistory[parentUrlHistory.length - 1]).not.toBe(
      iframeInternalState.household,
    );
  });

  it("shows how it should work", () => {
    const iframeInternalState = { household: "initial" };
    const parentUrlHistory = [];

    // Function to simulate iframe behavior (correct version)
    const simulateIframeClick_CORRECT = (newHousehold) => {
      // 1. User clicks, iframe updates its own state FIRST
      iframeInternalState.household = newHousehold;

      // 2. THEN sends message with NEW state
      parentUrlHistory.push(iframeInternalState.household);

      console.log(`After clicking ${newHousehold}:`);
      console.log(`  Iframe shows: ${iframeInternalState.household}`);
      console.log(
        `  Parent URL shows: ${parentUrlHistory[parentUrlHistory.length - 1]}`,
      );
      console.log(
        `  In sync? ${iframeInternalState.household === parentUrlHistory[parentUrlHistory.length - 1]}`,
      );
    };

    // Simulate user interactions
    console.log("\n=== CORRECT BEHAVIOR (how it should work) ===");
    simulateIframeClick_CORRECT("12345");
    simulateIframeClick_CORRECT("67890");
    simulateIframeClick_CORRECT("99999");

    // Verify they stay in sync
    expect(parentUrlHistory).toEqual(["12345", "67890", "99999"]);
    expect(iframeInternalState.household).toBe("99999");

    // The parent and iframe show the same value!
    expect(parentUrlHistory[parentUrlHistory.length - 1]).toBe(
      iframeInternalState.household,
    );
  });

  it("explains the fix needed", () => {
    console.log("\n=== FIX NEEDED ===");
    console.log("The obbba-scatter app needs to:");
    console.log("1. Update its own state/URL first");
    console.log("2. THEN send the postMessage with the NEW state");
    console.log("\nCurrently it's doing:");
    console.log("1. Send postMessage with OLD state");
    console.log("2. Then update its own state");

    // This test always passes - it's just for documentation
    expect(true).toBe(true);
  });
});
