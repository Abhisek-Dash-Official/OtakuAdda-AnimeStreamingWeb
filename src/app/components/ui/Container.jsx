import Card from "./Card.jsx";

export default function Container({ data }) {
  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 md:py-10 flex flex-wrap justify-center gap-6 md:gap-8 bg-gradient-to-r from-gray-800/45 to-gray-900/45 rounded-2xl shadow-lg">
      {data.map((item) => (
        <div
          key={item._id}
          className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Card item={item} />
        </div>
      ))}
    </div>
  );
}
