import { Container } from "react-bootstrap";
import useMobile from "../../layout/Responsive";
import { Helmet } from "react-helmet";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Link } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import { COUNTRY_NAMES } from "../../data/countries";

export default function ApiTermsOfService() {
  const mobile = useMobile();
  const countryId = useCountryId();

  const DEFAULT_JURISDICTION = "the District of Columbia";

  const getJurisdiction = (id) => {
    const country = COUNTRY_NAMES[id];

    if (country) {
      return country.phrasal || country.standard;
    }
    return DEFAULT_JURISDICTION;
  };

  const jurisdiction = getJurisdiction(countryId);

  return (
    <>
      <Helmet>
        <title>API Terms of Service | PolicyEngine</title>
      </Helmet>
      <Header />
      <Container
        style={{
          paddingTop: 100,
          paddingLeft: !mobile && 100,
          paddingRight: !mobile && 100,
          paddingBottom: 100,
        }}
      >
        <h1>PolicyEngine API Terms of Service</h1>

        <p>
          These PolicyEngine API Terms of Service (&quot;<strong>Terms</strong>
          &quot;) form a binding agreement between PolicyEngine, Inc. (&quot;
          <strong>
            PolicyEngine,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;
          </strong>
          ) and the entity or person agreeing to them (&quot;
          <strong>Customer,&quot; &quot;you,&quot; or &quot;your&quot;</strong>)
          that accesses or uses the PolicyEngine application‑programming
          interface, endpoints, documentation, and any related services
          (collectively, the &quot;<strong>API</strong>&quot;).{" "}
          <strong>
            By requesting API credentials, making an API call, or otherwise
            using the API, you accept these Terms.
          </strong>
        </p>

        <hr />

        <h2>1. Definitions</h2>
        <p>
          <strong>&quot;AGPL&quot;</strong> means the GNU Affero General Public
          License v3.0.
          <br />
          <strong>&quot;Household Scenario&quot;</strong> means data describing
          a hypothetical or de‑identified household, such as age bands, income
          ranges, and geographic codes that cannot reasonably be linked to an
          identified or identifiable person.
          <br />
          <strong>&quot;Output&quot;</strong> means the JSON or other results
          returned by the API in response to a request.
          <br />
          <strong>&quot;Request Data&quot;</strong> means the payload, headers,
          and metadata you submit to the API.
          <br />
          <strong>&quot;Service Level Credits&quot;</strong> means the fee
          credits defined in Section 8.
          <br />
          <strong>&quot;Usage Logs&quot;</strong> means system logs that include
          Request Data or Output and related metadata.
        </p>

        <hr />

        <h2>2. API License and Access</h2>
        <ol>
          <li>
            <strong>Limited License.</strong> Subject to these Terms,
            PolicyEngine grants you a non‑exclusive, non‑transferable, revocable
            license to access and use the API solely to build or operate
            software or services that compute or analyze public‑policy outcomes.
          </li>
          <li>
            <strong>API Keys.</strong> You agree to keep your API credentials
            confidential and may not share them except with agents acting on
            your behalf under written confidentiality obligations.
          </li>
          <li>
            <strong>Acceptable Use.</strong> You will not (a) submit malware,
            unlawful content, or personal data that identifies a natural person;
            (b) attempt to reverse‑engineer, scrape, or violate rate limits; (c)
            use the API to provide legal or tax advice without appropriate
            professional oversight; or (d) misrepresent Output as official
            government guidance.
          </li>
        </ol>

        <hr />

        <h2>3. Customer Data</h2>
        <ol>
          <li>
            <strong>No PII Submission.</strong> You shall not submit names, full
            street addresses, Social Security numbers, or other direct
            identifiers. If you inadvertently submit personal data, you must
            notify us promptly and cooperate in deletion.
          </li>
          <li>
            <strong>Representation.</strong> You represent that Request Data
            consists of (i) Household Scenarios <strong>or</strong> (ii)
            information you are lawfully authorized to process and share with
            PolicyEngine.
          </li>
          <li>
            <strong>Ownership.</strong> You retain all rights in Request Data
            and Output, except that you grant PolicyEngine a worldwide,
            royalty‑free license to process Request Data and Output to provide
            the API and improve our microsimulation models.
          </li>
        </ol>

        <hr />

        <h2>4. Data Handling & Anonymisation</h2>
        <p>
          PolicyEngine logs request and response data solely for speed of
          execution (caching), abuse‑detection, debugging, billing, and
          statistical research to improve its microsimulation models. Logs are
          never sold, shared with third parties (except subprocessors under
          equivalent obligations), or used to train public machine‑learning
          models.
        </p>

        <h2>5. Open‑Source Components</h2>
        <ol>
          <li>
            <strong>Python Package.</strong> Our reference Python implementation
            is licensed under the AGPL. API use does <strong>not</strong>{" "}
            trigger AGPL source‑code disclosure, but running or distributing the
            package yourself does.
          </li>
          <li>
            <strong>Priority of Terms.</strong> In case of conflict, these API
            Terms govern your API access; the AGPL governs your use of our
            open‑source code.
          </li>
        </ol>

        <hr />

        <h2>6. Intellectual‑Property Rights</h2>
        <ol>
          <li>
            <strong>PolicyEngine IP.</strong> Aside from the limited license in
            Section 2, PolicyEngine retains all rights in the API,
            documentation, and underlying models.
          </li>
          <li>
            <strong>Feedback.</strong> You grant PolicyEngine a perpetual,
            irrevocable, royalty‑free license to use any feedback you provide to
            improve the API.
          </li>
        </ol>

        <hr />

        <h2>7. Rate Limits; Fair Use</h2>
        <p>
          We may impose request‑per‑minute or daily volume limits, published in
          the dashboard or documentation. Excess use may result in temporary
          throttling or suspension without liability.
        </p>

        <hr />

        <h2>8. Service Levels & Support</h2>
        <ol>
          <li>
            <strong>Uptime Commitment.</strong> We target{" "}
            <strong>99% monthly API availability</strong>. If availability drops
            below 99%, you may request Service Level Credits equal to 10% of
            that month&apos;s fees.
          </li>
          <li>
            <strong>Planned Maintenance.</strong> We will give at least 24
            hours&apos; notice for planned downtime exceeding 15 minutes.
          </li>
          <li>
            <strong>Support.</strong> Standard e‑mail support
            (support@policyengine.org) is included. Contact{" "}
            <a href="mailto:support@policyengine.org">
              support@policyengine.org
            </a>{" "}
            for enterprise support.
          </li>
        </ol>

        <hr />

        <h2>9. Security & Privacy</h2>
        <p>
          We maintain administrative, technical, and physical safeguards
          designed to protect Request Data. Details appear in our{" "}
          <Link to={`/${countryId}/privacy`}>Privacy Policy</Link>, which is
          incorporated by reference.
        </p>

        <hr />

        <h2>10. Confidentiality</h2>
        <p>
          Each party will protect the other&apos;s non‑public information with
          the same care it uses for its own, but at least reasonable care, and
          will use it only to exercise rights and fulfil obligations under these
          Terms.
        </p>

        <hr />

        <h2>11. Term & Termination</h2>
        <ol>
          <li>
            <strong>Term.</strong> These Terms start when you first use the API
            and continue until terminated.
          </li>
          <li>
            <strong>Termination for Convenience.</strong> Either party may
            terminate at any time on 30 days&apos; written notice.
          </li>
          <li>
            <strong>Termination for Cause.</strong> Either party may terminate
            immediately if the other materially breaches these Terms and fails
            to cure within 15 days of notice.
          </li>
          <li>
            <strong>Effect.</strong> Upon termination you must cease API calls.
            Sections 4 (aggregated logs), 5, 6, 10, 12–17 survive.
          </li>
        </ol>

        <hr />

        <h2>12. Disclaimers</h2>
        <p>
          THE API AND OUTPUT ARE PROVIDED <strong>&quot;AS IS&quot;</strong>.
          POLICYENGINE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON‑INFRINGEMENT. OUTPUT IS <strong>ILLUSTRATIVE ONLY</strong> AND NOT
          LEGAL, TAX, OR FINANCIAL ADVICE.
        </p>

        <hr />

        <h2>13. Limitation of Liability</h2>
        <ol>
          <li>
            <strong>Indirect Damages.</strong> POLICYENGINE WILL NOT BE LIABLE
            FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR LOSS
            OF PROFITS OR DATA, EVEN IF ADVISED OF THE POSSIBILITY.
          </li>
          <li>
            <strong>Cap.</strong> POLICYENGINE&apos;S TOTAL LIABILITY WILL NOT
            EXCEED THE FEES PAID BY CUSTOMER IN THE 12 MONTHS PRECEDING THE
            EVENT GIVING RISE TO THE CLAIM.
          </li>
        </ol>

        <hr />

        <h2>14. Indemnification</h2>
        <p>
          You will defend, indemnify, and hold harmless PolicyEngine from any
          third‑party claim arising from your (a) misuse of the API, (b)
          violation of these Terms, or (c) infringement of intellectual‑property
          or privacy rights.
        </p>

        <hr />

        <h2>15. Modifications to the API or Terms</h2>
        <p>
          We may modify these Terms or the API by posting an updated version or
          sending notice to your account e‑mail. Changes take effect 30 days
          after notice. Continued use constitutes acceptance.
        </p>

        <hr />

        <h2>16. Governing Law; Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of {jurisdiction}, excluding its
          conflict of law rules. The parties will resolve disputes exclusively
          in the federal or state courts located in{" "}
          {jurisdiction === "the United Kingdom" ? "London" : "Washington, DC"},
          and consent to personal jurisdiction there.
        </p>

        <hr />

        <h2>17. Assignment; Entire Agreement</h2>
        <p>
          You may not assign these Terms without PolicyEngine&apos;s prior
          written consent. These Terms, any Order Form, and the documents linked
          herein constitute the entire agreement and supersede all prior
          agreements regarding their subject.
        </p>

        <hr />

        <h2>18. Contact</h2>
        <p>
          Questions may be directed to <strong>legal@policyengine.org</strong>
        </p>

        <hr />

        <p>
          <strong>
            By using the API you acknowledge that you have read, understood, and
            agree to be bound by these Terms.
          </strong>
        </p>
      </Container>
      <Footer />
    </>
  );
}
