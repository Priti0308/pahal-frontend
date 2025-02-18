import FeaturedEvent from "../components/gallary/FeaturedEvent";
import FilterButtons from "../components/gallary/FilterButton";
import GalleryGrid from "../components/gallary/GalleryGrid";
import StatsSection from "../components/gallary/StatSection";

function Gallery() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Event Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the memorable moments from CIMDR's intercollegiate
          competitions featuring software development, management challenges,
          and soft skills events.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
            Register Now
          </button>
          <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-gray-100">
            View Schedule
          </button>
        </div>
      </header>

      <StatsSection />
      <FilterButtons />
      <GalleryGrid />
      <FeaturedEvent />

      <div className="text-center mt-8">
        <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-gray-100">
          Load More
        </button>
      </div>
    </div>
  );
}

export default Gallery;
