"use client";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-400">
          Terms & Conditions
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold">OtakuAdda</span>. By using
          our platform, you agree to the following terms and conditions. Please
          read them carefully before continuing.
        </p>

        {/* Sections */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            1. Acceptance of Terms
          </h2>
          <p className="leading-relaxed">
            By accessing or using our services, you confirm that you have read,
            understood, and agree to be bound by these Terms. If you do not
            agree, please discontinue using the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            2. User Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not share copyrighted content illegally.</li>
            <li>Respect other members of the community.</li>
            <li>Do not use offensive language or spam.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            3. Privacy Policy
          </h2>
          <p className="leading-relaxed">
            Your privacy is important to us. Any information you provide will be
            handled according to our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-amber-300">
            4. Termination
          </h2>
          <p className="leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these terms without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
}
