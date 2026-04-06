import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Defray",
  description:
    "How Defray collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
            href="/terms"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto w-full px-6 py-16 prose-defray">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          Legal
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-text3 mb-10">
          Effective date: 6 April 2026 &middot; Last updated: 6 April 2026
        </p>

        <p>
          Defray (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
          operates the Defray mobile application (iOS &amp; Android) and the
          website at{" "}
          <a href="https://defray.app" className="text-accent hover:underline">
            defray.app
          </a>{" "}
          (together, the &ldquo;Service&rdquo;). This Privacy Policy explains
          how we collect, use, disclose, and safeguard your personal information
          when you use the Service.
        </p>
        <p>
          By accessing or using the Service you agree to this Privacy Policy. If
          you do not agree, please do not use the Service.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Information You Provide</h3>
        <ul>
          <li>
            <strong>Account information</strong> — full name, email address,
            phone number, and password when you create an account.
          </li>
          <li>
            <strong>Identity verification (KYC)</strong> — government-issued ID
            type (driver licence or passport), ID number, date of birth, and
            residential address. This is required under Australian regulations
            before you can access card-issuing features.
          </li>
          <li>
            <strong>Payment information</strong> — top-up amounts and
            contribution details. Actual payment card numbers are processed by
            our payment partner Airwallex and are never stored on our servers.
          </li>
          <li>
            <strong>Group &amp; event data</strong> — group names, occasion
            types, destinations, dates, budgets, availability responses, votes,
            and expenses you create or participate in.
          </li>
          <li>
            <strong>Receipt images</strong> — photos you capture using the
            receipt scanner feature for expense itemisation.
          </li>
          <li>
            <strong>Waitlist information</strong> — email address submitted
            through the website waitlist form.
          </li>
        </ul>

        <h3>1.2 Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Device information</strong> — device model, operating system
            version, unique device identifiers, and app version.
          </li>
          <li>
            <strong>Push notification tokens</strong> — Expo push tokens stored
            to deliver notifications to your device.
          </li>
          <li>
            <strong>Security data</strong> — jailbreak/root detection results
            and biometric authentication events (success/failure, never
            biometric data itself) for fraud prevention.
          </li>
          <li>
            <strong>Usage data</strong> — screens visited, features used, and
            interaction patterns to improve the Service.
          </li>
          <li>
            <strong>Transaction data</strong> — card tap amounts, merchant
            names, timestamps, and currency for expenses processed through the
            shared virtual card.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account and authenticate your sessions.</li>
          <li>
            Verify your identity for KYC compliance under the Australian
            ePayments Code and applicable AML/CTF legislation.
          </li>
          <li>
            Process group fund contributions, issue shared virtual cards, and
            settle expense splits.
          </li>
          <li>
            Send push notifications about card taps, expense additions, group
            invitations, votes, and settlement updates.
          </li>
          <li>Calculate organiser reliability scores based on payment and event history.</li>
          <li>
            Detect compromised devices (jailbroken/rooted) and prevent
            fraudulent access.
          </li>
          <li>Improve, personalise, and maintain the Service.</li>
          <li>
            Communicate with you about updates, security alerts, and support
            requests.
          </li>
          <li>
            Comply with legal obligations, resolve disputes, and enforce our
            Terms of Service.
          </li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>We do not sell your personal information. We may share it with:</p>
        <ul>
          <li>
            <strong>Airwallex</strong> — our payments partner that issues
            virtual cards, processes transactions, and manages wallets. Airwallex
            holds an Australian Financial Services Licence (AFSL) and processes
            data under its own privacy policy.
          </li>
          <li>
            <strong>Supabase</strong> — our backend infrastructure provider
            (database hosting, authentication, edge functions) with servers
            located in Sydney, Australia.
          </li>
          <li>
            <strong>Expo / Expo Push Notification Service</strong> — to deliver
            push notifications to your device.
          </li>
          <li>
            <strong>Group members</strong> — your name, contribution status,
            reliability score, and expense activity are visible to other members
            of groups you join. This is essential for the Service to function.
          </li>
          <li>
            <strong>Law enforcement &amp; regulators</strong> — when required by
            law, court order, or regulatory obligation.
          </li>
        </ul>

        <h2>4. Data Storage &amp; Security</h2>
        <ul>
          <li>
            All data is stored on Supabase servers in Sydney, Australia
            (ap-southeast-2).
          </li>
          <li>
            Authentication tokens are stored in the device&rsquo;s secure
            enclave — iOS Keychain and Android EncryptedSharedPreferences via
            Android Keystore. Tokens are never stored in plaintext.
          </li>
          <li>
            High-value actions (top-ups over A$200) require biometric
            re-authentication (Face ID, fingerprint, or device PIN).
          </li>
          <li>
            The app performs jailbreak and root detection at launch and blocks
            access on compromised devices.
          </li>
          <li>All network communication uses TLS encryption.</li>
          <li>
            Airwallex API credentials are stored as server-side secrets and are
            never exposed to the client application.
          </li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>
          Under the Australian Privacy Act 1988 and the Australian Privacy
          Principles (APPs), you have the right to:
        </p>
        <ul>
          <li>
            <strong>Access</strong> — request a copy of the personal information
            we hold about you.
          </li>
          <li>
            <strong>Correction</strong> — request correction of inaccurate or
            incomplete information.
          </li>
          <li>
            <strong>Deletion</strong> — request deletion of your account and
            associated data, subject to legal retention requirements.
          </li>
          <li>
            <strong>Notification opt-out</strong> — disable push notifications
            at any time via the app&rsquo;s profile settings or your device
            settings.
          </li>
          <li>
            <strong>Complaint</strong> — lodge a complaint with the Office of
            the Australian Information Commissioner (OAIC) if you believe your
            privacy has been breached.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:team@defray.app"
            className="text-accent hover:underline"
          >
            team@defray.app
          </a>
          .
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is
          active or as needed to provide the Service. When you delete your
          account:
        </p>
        <ul>
          <li>
            Account details and profile information are deleted within 30 days.
          </li>
          <li>
            Transaction and expense records may be retained for up to 7 years to
            comply with Australian financial record-keeping obligations (AML/CTF
            Act, Tax Act).
          </li>
          <li>
            KYC verification records are retained for the minimum period
            required by law.
          </li>
          <li>Anonymised, aggregated data may be retained indefinitely.</li>
        </ul>

        <h2>7. Cookies &amp; Tracking (Website)</h2>
        <p>
          The Defray website uses minimal, essential cookies for functionality
          (e.g., session management). We do not use third-party advertising
          trackers. The waitlist form stores your email in our Supabase database
          solely for launch notifications.
        </p>

        <h2>8. Children&rsquo;s Privacy</h2>
        <p>
          The Service is not directed at anyone under the age of 18. We do not
          knowingly collect personal information from children. If you believe a
          child has provided us with personal information, please contact us at{" "}
          <a
            href="mailto:team@defray.app"
            className="text-accent hover:underline"
          >
            team@defray.app
          </a>{" "}
          and we will delete it promptly.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          Your data is primarily stored in Australia. Some service providers
          (Expo, Airwallex) may process data in other jurisdictions. Where this
          occurs, we ensure appropriate safeguards are in place consistent with
          the Australian Privacy Principles.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of material changes by posting a notice in the app or sending a
          push notification. Your continued use of the Service after changes are
          posted constitutes acceptance of the updated policy.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices,
          contact us at:
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
