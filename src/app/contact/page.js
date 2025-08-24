export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Contact <span className="text-indigo-600">Us</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          Got a question, suggestion, or just want to say{" "}
          <span className="italic">konnichiwa 👋</span>? We’d love to hear from
          you! The OtakuAdda team is always open to feedback and collaborations.
        </p>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
            Reach Out 📡
          </h2>
          <p className="text-gray-700">
            📧 Email:{" "}
            <a
              href="mailto:support@otakuadda.com"
              className="text-indigo-600 font-medium hover:underline"
            >
              support@otakuadda.com
            </a>
          </p>
          <p className="text-gray-700">
            🐦 Twitter:{" "}
            <a
              href="https://twitter.com/otakuadda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              @OtakuAdda
            </a>
          </p>
          <p className="text-gray-700">
            📸 Instagram:{" "}
            <a
              href="https://instagram.com/otakuadda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              @otakuadda
            </a>
          </p>
          <p className="text-gray-700">📍 Location: Akihabara (in spirit 😉)</p>
        </div>

        <p className="text-sm text-gray-500">
          Whether you’re a fan, creator, or just passing by… we’re always happy
          to connect! 🌸
        </p>
      </div>
    </div>
  );
}
