import { categories } from "@/data/objects/Categories";

export default function CategorySection({ setGender }) {
  return (
    <section className="text-center w-full px-4 py-16 font-poppins">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Browse The Range</h2>
      <p className="color-gray mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div className="flex flex-col items-center justify-center" key={cat.id}>
            <div className="rounded-xl w-full h-[50vh] select-none cursor-pointer transition-all hover:scale-105 object-cover"
              // style={{ backgroundImage: `url(${cat.backgroundImage.src})` }}>
              style={{ backgroundImage: `url(${cat.backgroundImage.src})` }}
              onClick={() => setGender(cat.label.toLowerCase())}
            >
            </div>
            <p className="mt-4 font-medium text-lg">{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
