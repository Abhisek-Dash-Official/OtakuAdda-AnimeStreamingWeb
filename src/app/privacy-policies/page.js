"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-400">
          Privacy Policy
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed">
          At <span className="font-semibold">OtakuAdda</span>, your privacy is
          our top priority. This Privacy Policy explains how we collect, use,
          and protect your personal data when you interact with our platform.
        </p>

        {/* Sections */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Account Information:</span>{" "}
              including name, email, and login details.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> activity logs,
              preferences, and interactions with our platform.
            </li>
            <li>
              <span className="font-semibold">Device Information:</span> browser
              type, operating system, and IP address.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            2. How We Use Your Data
          </h2>
          <p className="leading-relaxed">
            We use your information to provide and improve our services,
            personalize your experience, ensure security, and comply with legal
            obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            3. Data Sharing
          </h2>
          <p className="leading-relaxed">
            We do not sell or rent your personal information. Data may be shared
            only with trusted friends or required by law for compliance and
            security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            4. Data Security
          </h2>
          <p className="leading-relaxed">
            We implement strong security measures to protect your data from
            unauthorized access, disclosure, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            5. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Right to access your personal data.</li>
            <li>Right to request corrections or deletions.</li>
            <li>Right to withdraw consent at any time.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
