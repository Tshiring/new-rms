import { achievements } from "../../../constants/achievementsList";

function AchievementCard({ achievement }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-2 group">
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        {achievement.number}
        {achievement.suffix}
      </div>
      <p className="text-gray-600 text-lg font-medium group-hover:text-purple-600 transition-colors duration-200">
        {achievement.label}
      </p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-2">
            Our Achievements
          </h2>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}
