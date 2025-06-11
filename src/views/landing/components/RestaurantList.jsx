import { Star, StarHalf } from "lucide-react";
import { restaurantList } from "../../../constants/restaurantList";

export default function RestaurantList() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FIND YOUR PERFECT RESTAURANT
          </h2>
          <p className="text-xl text-purple-600 font-medium">
            Wide variety of options
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-purple-700 border-2 border-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-700 hover:text-white hover:shadow-lg transform hover:scale-105">
            Load More Restaurants
          </button>
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating, maxRating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-orange-400 text-orange-400"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-orange-400 text-orange-400" />
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}

      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating}/{maxRating}
      </span>
    </div>
  );
}

function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-200">
          {restaurant.name}
        </h3>

        {/* Rating */}
        <div className="mb-4">
          <StarRating
            rating={restaurant.rating}
            maxRating={restaurant.maxRating}
          />
        </div>

        {/* Visit Button */}
        <button className="w-full bg-purple-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-purple-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]">
          Visit restaurant
        </button>
      </div>
    </div>
  );
}
