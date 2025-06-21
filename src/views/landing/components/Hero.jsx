export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {/* Dark overlay for better text readability */}
      <img
        src="/src/assets/images/resturant.jpg"
        alt=""
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-shadow-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Welcome to the
          <br />
          <span className="block mt-2">Restaurant Management System.</span>
        </h1>

        {/* Optional subtitle */}
        <p className="text-shadow-lg mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Streamline your restaurant operations with our comprehensive
          management solution
        </p>

        {/* Call-to-action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
