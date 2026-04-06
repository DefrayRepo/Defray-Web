import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Defray",
  description:
    "The terms and conditions governing your use of the Defray app and website.",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col flex-1">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight flex items-center gap-2.5"
          >
            <span className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
              D
            </span>
            Defray
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto w-full px-6 py-16 prose-defray">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          Legal
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-text3 mb-10">
          Effective date: 6 April 2026 &middot; Last updated: 6 April 2026
        </p>

        <p>
          Welcome to Defray. These Terms of Service (&ldquo;Terms&rdquo;) govern
          your access to and use of the Defray mobile application (iOS &amp;
          Android) and the website at{" "}
          <a href="https://defray.app" className="text-accent hover:underline">
            defray.app
          </a>{" "}
          (together, the &ldquo;Service&rdquo;), operated by Defray
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
        </p>
        <p>
          By creating an account or using the Service, you agree to be bound by
          these Terms. If you do not agree, do not use the Service.
        </p>

        <h2>1. Eligibility</h2>
        <ul>
          <li>You must be at least 18 years of age.</li>
          <li>You must be an Australian resident or hold a valid Australian address.</li>
          <li>
            You must provide accurate, complete, and current information during
            registration and identity verification (KYC).
          </li>
          <li>
            You must not use the Service if you have been previously suspended
            or removed.
          </li>
        </ul>

        <h2>2. Account &amp; Security</h2>
        <ul>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            account.
          </li>
          <li>
            You must immediately notify us at{" "}
            <a
              href="mailto:team@defray.app"
              className="text-accent hover:underline"
            >
              team@defray.app
            </a>{" "}
            if you suspect unauthorised access to your account.
          </li>
          <li>
            We may suspend or terminate your account if we detect compromised
            device security (jailbroken or rooted devices), suspicious activity,
            or a breach of these Terms.
          </li>
        </ul>

        <h2>3. Identity Verification (KYC)</h2>
        <p>
          To access card-issuing and payment features, you must complete identity
          verification in accordance with the Australian ePayments Code and
          applicable Anti-Money Laundering and Counter-Terrorism Financing
          (AML/CTF) legislation. You agree to provide a valid government-issued
          ID (driver licence or passport), date of birth, and residential
          address. Verification is processed through our systems and our payment
          partner Airwallex.
        </p>

        <h2>4. The Service</h2>

        <h3>4.1 Group Funds &amp; Shared Virtual Cards</h3>
        <p>
          Defray enables users to create groups for social events, contribute
          funds to a shared pool, and spend from a shared virtual Mastercard.
          Key behaviours:
        </p>
        <ul>
          <li>
            <strong>Pre-funded model</strong> — each group member contributes
            their share before the event. The group card activates only when the
            funding threshold (set by the organiser) is reached.
          </li>
          <li>
            <strong>Organiser role</strong> — the user who creates a group is
            the organiser. They set the budget, per-person amount, funding
            threshold, and dropout rule.
          </li>
          <li>
            <strong>Dropout rule</strong> — if a member withdraws, the
            organiser&rsquo;s chosen rule applies (redistribute among remaining
            members, fill from a waitlist, or block further changes).
          </li>
          <li>
            <strong>Card usage</strong> — the shared virtual card can be used
            anywhere Mastercard is accepted via tap-to-pay (NFC). Each
            transaction is automatically split among the designated participants.
          </li>
        </ul>

        <h3>4.2 Expenses &amp; Settlements</h3>
        <ul>
          <li>
            Expenses can be created automatically via card taps or manually
            entered by group members.
          </li>
          <li>
            Receipts can be scanned and itemised for line-item splitting.
          </li>
          <li>
            At the end of an event, unsettled amounts are resolved using a
            minimum-transfer algorithm. You are responsible for completing any
            outstanding transfers shown in the Settle screen.
          </li>
        </ul>

        <h3>4.3 Currency</h3>
        <p>
          The Service currently supports Australian Dollars (AUD) only. All
          amounts displayed in the app are in AUD unless otherwise stated.
        </p>

        <h2>5. Payment Processing</h2>
        <p>
          Payment processing, card issuing, and wallet services are provided by{" "}
          <strong>Airwallex Pty Ltd</strong>, which holds an Australian Financial
          Services Licence (AFSL). By using the payment features of the Service,
          you also agree to Airwallex&rsquo;s terms and conditions. Defray does
          not hold an AFSL and acts as a technology platform that facilitates
          group expense management.
        </p>
        <ul>
          <li>
            We do not store your full payment card numbers — these are processed
            and stored by Airwallex.
          </li>
          <li>
            Top-ups and contributions are processed through Airwallex&rsquo;s
            secure infrastructure.
          </li>
          <li>
            We are not responsible for Airwallex service disruptions, card
            declines, or transaction processing delays.
          </li>
        </ul>

        <h2>6. Fees</h2>
        <p>
          Defray is currently free to use during the beta period. We reserve the
          right to introduce fees in the future, in which case we will provide
          at least 30 days&rsquo; notice via the app or email. Airwallex may
          charge its own fees for certain transactions (e.g., currency
          conversion) — these are disclosed at the time of the transaction.
        </p>

        <h2>7. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Service for any unlawful purpose or in violation of any
            applicable Australian law or regulation.
          </li>
          <li>
            Provide false, misleading, or fraudulent information during
            registration, KYC verification, or at any other time.
          </li>
          <li>
            Use the Service on a rooted (Android) or jailbroken (iOS) device.
            The app will detect and block access on compromised devices for
            security reasons.
          </li>
          <li>
            Attempt to reverse engineer, decompile, or tamper with the app, its
            security mechanisms, or its communication with our servers.
          </li>
          <li>
            Use the Service to launder money, finance terrorism, or facilitate
            any other financial crime.
          </li>
          <li>
            Abuse, harass, or harm other users, or use group features to
            intimidate or defraud other members.
          </li>
          <li>
            Create groups or expenses for fictitious events for the purpose of
            manipulating funds.
          </li>
          <li>
            Circumvent any rate limits, security measures, or access controls.
          </li>
        </ul>

        <h2>8. Reliability Scores</h2>
        <p>
          Defray calculates reliability scores for organisers based on payment
          history and event outcomes. These scores are visible to group members.
          While we strive for accuracy, reliability scores are informational only
          and should not be the sole basis for financial decisions.
        </p>

        <h2>9. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the Service — including
          but not limited to text, graphics, logos, icons, software, and the
          underlying code — are owned by Defray or its licensors and are
          protected by Australian and international copyright, trademark, and
          other intellectual property laws.
        </p>
        <p>
          You may not copy, modify, distribute, or create derivative works from
          any part of the Service without our prior written consent.
        </p>

        <h2>10. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. To the maximum extent permitted by Australian
          law (including the Australian Consumer Law), we disclaim all
          warranties, express or implied, including but not limited to implied
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
          <li>Results obtained from the Service will be accurate or reliable.</li>
          <li>
            The shared virtual card will be accepted at all merchants or in all
            circumstances.
          </li>
        </ul>

        <h2>11. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by Australian law, Defray shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits, data, use, or goodwill,
          arising out of or in connection with your use of the Service.
        </p>
        <p>
          Nothing in these Terms excludes, restricts, or modifies any consumer
          guarantee, right or remedy conferred on you by the Australian Consumer
          Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)) or any
          other applicable law that cannot be excluded, restricted, or modified
          by agreement.
        </p>

        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Defray, its officers,
          directors, employees, and agents from any claims, damages, losses,
          liabilities, and expenses (including reasonable legal fees) arising out
          of or related to your use of the Service, your violation of these
          Terms, or your violation of any rights of a third party.
        </p>

        <h2>13. Termination</h2>
        <ul>
          <li>
            <strong>By you</strong> — you may delete your account at any time
            from the Profile screen or by contacting{" "}
            <a
              href="mailto:team@defray.app"
              className="text-accent hover:underline"
            >
              team@defray.app
            </a>
            . Outstanding group balances must be settled before deletion.
          </li>
          <li>
            <strong>By us</strong> — we may suspend or terminate your access
            immediately, without prior notice, if you breach these Terms,
            provide fraudulent KYC information, or if your device is detected as
            compromised. We may also terminate the Service entirely with 30
            days&rsquo; notice.
          </li>
          <li>
            Upon termination, your right to use the Service ceases. Sections
            that by their nature should survive (including Limitation of
            Liability, Indemnification, and Governing Law) will remain in
            effect.
          </li>
        </ul>

        <h2>14. Modifications to the Terms</h2>
        <p>
          We may revise these Terms at any time. We will notify you of material
          changes at least 14 days before they take effect, via an in-app notice
          or push notification. Your continued use of the Service after the
          revised Terms become effective constitutes your acceptance.
        </p>

        <h2>15. Governing Law &amp; Dispute Resolution</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the State of Victoria, Australia. Any dispute arising out of or in
          connection with these Terms shall be subject to the exclusive
          jurisdiction of the courts of Victoria, Australia.
        </p>

        <h2>16. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or
          invalid, that provision shall be limited or eliminated to the minimum
          extent necessary, and the remaining provisions shall remain in full
          force and effect.
        </p>

        <h2>17. Entire Agreement</h2>
        <p>
          These Terms, together with our{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          , constitute the entire agreement between you and Defray regarding the
          Service and supersede all prior agreements and understandings.
        </p>

        <h2>18. Contact Us</h2>
        <p>
          If you have questions about these Terms, contact us at:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:team@defray.app"
              className="text-accent hover:underline"
            >
              team@defray.app
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://defray.app"
              className="text-accent hover:underline"
            >
              defray.app
            </a>
          </li>
        </ul>
      </article>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text3">
          <span>&copy; 2026 Defray. Built in Melbourne, Australia.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-text transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
