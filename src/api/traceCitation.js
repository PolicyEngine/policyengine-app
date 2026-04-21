/**
 * Utilities for generating citations for TRACE TRO results
 */

/**
 * Generate a BibTeX citation for a TRO result
 * @param {Object} options - Citation options
 * @param {string} options.troUrl - The TRO URL
 * @param {string} options.troId - The TRO ID
 * @param {string} options.country - Country code (us, uk)
 * @param {string} options.simulationType - Type of simulation (household, policy)
 * @param {string} [options.accessDate] - Access date (defaults to today)
 * @returns {string} BibTeX formatted citation
 */
export function generateBibTeXCitation({
  troUrl,
  troId,
  country,
  simulationType,
  accessDate,
}) {
  const year = new Date().getFullYear();
  const dateAccessed = accessDate || new Date().toISOString().split("T")[0];

  return `@misc{policyengine_${troId},
  author = {{PolicyEngine}},
  title = {${simulationType.charAt(0).toUpperCase() + simulationType.slice(1)} Simulation Result},
  year = {${year}},
  url = {${troUrl}},
  note = {TRACE Transparent Research Object. Accessed: ${dateAccessed}}
}`;
}

/**
 * Generate an APA citation for a TRO result
 * @param {Object} options - Citation options (same as BibTeX)
 * @returns {string} APA formatted citation
 */
export function generateAPACitation({
  troUrl,
  troId,
  country,
  simulationType,
  accessDate,
}) {
  const year = new Date().getFullYear();
  const dateAccessed = accessDate || new Date().toISOString().split("T")[0];

  return `PolicyEngine. (${year}). ${simulationType.charAt(0).toUpperCase() + simulationType.slice(1)} simulation result [TRACE Transparent Research Object]. Retrieved ${dateAccessed}, from ${troUrl}`;
}

/**
 * Generate a Chicago-style citation for a TRO result
 * @param {Object} options - Citation options (same as BibTeX)
 * @returns {string} Chicago formatted citation
 */
export function generateChicagoCitation({
  troUrl,
  troId,
  country,
  simulationType,
  accessDate,
}) {
  const year = new Date().getFullYear();
  const dateAccessed = accessDate || new Date().toISOString().split("T")[0];

  return `PolicyEngine. "${simulationType.charAt(0).toUpperCase() + simulationType.slice(1)} Simulation Result." TRACE Transparent Research Object. ${year}. Accessed ${dateAccessed}. ${troUrl}.`;
}

/**
 * Generate the CLI validation command for a TRO
 * @param {string} filename - The filename (defaults to trace.tro.jsonld)
 * @returns {string} CLI command
 */
export function generateValidationCommand(
  filename = "path/to/trace.tro.jsonld",
) {
  return `policyengine trace-tro-validate ${filename}`;
}

/**
 * Generate a permalink URL for a TRO
 * @param {string} country - Country code
 * @param {string} troId - TRO ID
 * @returns {string} Permalink URL
 */
export function generateTROPermalink(country, troId) {
  const baseUrl =
    window.location.origin || `https://policyengine.org/${country}`;
  return `${baseUrl}/${country}/trace/${troId}`;
}
