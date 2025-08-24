export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About <span className="text-indigo-600">OtakuAdda</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          Welcome to <span className="font-semibold">OtakuAdda</span> – your
          ultimate anime streaming & community hub! 🌸 Whether you’re into
          binge-watching the latest seasonal anime, rewatching timeless
          classics, or discussing theories with fellow fans, this is the place
          for you.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-600">
          Our mission is simple:{" "}
          <span className="italic">bring anime lovers together</span>. We focus
          on providing HD streaming, personalized watchlists, anime news, and an
          open space where fans can connect and share their passion. 🚀
        </p>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
            Why OtakuAdda?
          </h2>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
            <li>🎬 Unlimited Anime Streaming</li>
            <li>💬 Community Discussions</li>
            <li>📺 Personalized Watchlists</li>
            <li>✨ Built by fans, for fans</li>
          </ul>
        </div>

        <p className="text-gray-500 text-sm">
          This is just the beginning… stay tuned for more features and a growing
          community of fellow otakus! 💜
        </p>
      </div>
    </div>
  );
}
