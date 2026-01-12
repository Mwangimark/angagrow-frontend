import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaLeaf, FaTractor, FaChartLine } from "react-icons/fa";
import farmhero from "../../assets/farm-hero.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100">

      {/* Soft background blobs */}
      <div className="absolute top-24 left-16 w-80 h-80 bg-green-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-24 right-16 w-80 h-80 bg-lime-300/40 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* LEFT CONTENTu */}
        <div className="lg:col-span-5">

          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaLeaf />
            Smart Agriculture Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Grow Smarter.
            <span className="block text-emerald-600">
              Harvest More with AngaGrow
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mb-10">
            AngaGrow helps farmers and agribusinesses make data-driven decisions
            using AI, drone intelligence, and real-time field analytics.
          </p>

          {/* Feature points */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "AI Crop Monitoring",
              "Drone Route Planning",
              "Yield & Market Insights",
              "Smart Resource Optimization",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <FiCheckCircle className="text-emerald-600 text-lg" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition">
              Get Started
              <FiArrowRight />
            </button>

            <button className="border border-gray-300 bg-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-md transition">
              <FaChartLine className="text-emerald-600" />
              View Demo
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative lg:col-span-7">

          <div className="rounded-3xl overflow-hidden shadow-2xl w-full aspect-[4/3] bg-black/5">
            <img
              src={farmhero}
              alt="Smart farming with AngaGrow"
              className="w-full h-full object-cover object-center"
            />
          </div>



          {/* Floating card */}
          <div className="absolute -bottom-8 left-8 bg-white rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FaTractor className="text-emerald-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Live Farm Data</p>
                <p className="text-sm text-gray-500">AI-powered insights</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
