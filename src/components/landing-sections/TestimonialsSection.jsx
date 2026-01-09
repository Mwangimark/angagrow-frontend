import React from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Kamau",
      role: "Maize Farmer, Nakuru",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      quote: "AgnaGrow helped me increase my maize yield by 65% in just one season. The smart irrigation system alone saved me KES 120,000 in water costs.",
      rating: 5,
      farmSize: "50 Acres",
      improvement: "+65% Yield"
    },
    {
      name: "Sarah Wanjiku",
      role: "Coffee Farmer, Kiambu",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      quote: "The market insights feature connected me directly with exporters. I now get 40% better prices for my coffee beans.",
      rating: 5,
      farmSize: "25 Acres",
      improvement: "+40% Profit"
    },
    {
      name: "David Omondi",
      role: "Dairy & Crops Farmer, Meru",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w-150",
      quote: "The integrated system helped me optimize both my dairy and crop operations. My overall income increased by KES 800,000 annually.",
      rating: 5,
      farmSize: "80 Acres",
      improvement: "+55% Income"
    },
    {
      name: "Grace Muthoni",
      role: "Horticulture Farmer, Naivasha",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      quote: "Real-time monitoring and AI predictions helped me prevent crop diseases before they spread. Saved my entire flower farm.",
      rating: 5,
      farmSize: "15 Acres",
      improvement: "100% Saved"
    }
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Farmers 
            <span className="text-emerald-600"> Love AgnaGrow</span>
          </h2>
          <p className="text-xl text-gray-600">
            Hear from farmers who have transformed their operations with our platform
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Quote Icon */}
            <div className="text-emerald-500 mb-6">
              <FaQuoteLeft className="text-4xl" />
            </div>
            
            {/* Testimonial Content */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Farmer Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
                    <FiStar className="text-sm" />
                  </div>
                </div>
              </div>
              
              {/* Testimonial Text */}
              <div className="flex-1">
                <p className="text-xl text-gray-700 italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {testimonials[activeIndex].role}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-amber-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-700">5.0</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-4">
                    <div className="bg-emerald-50 px-4 py-2 rounded-lg">
                      <div className="text-sm text-gray-600">Farm Size</div>
                      <div className="font-bold text-emerald-600">{testimonials[activeIndex].farmSize}</div>
                    </div>
                    <div className="bg-teal-50 px-4 py-2 rounded-lg">
                      <div className="text-sm text-gray-600">Improvement</div>
                      <div className="font-bold text-teal-600">{testimonials[activeIndex].improvement}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
            >
              <FiChevronLeft className="text-xl text-gray-600 hover:text-emerald-600" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-emerald-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
            >
              <FiChevronRight className="text-xl text-gray-600 hover:text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { value: "98%", label: "Satisfaction Rate", color: "text-emerald-600" },
            { value: "4.9/5", label: "Average Rating", color: "text-amber-600" },
            { value: "10K+", label: "Active Users", color: "text-blue-600" },
            { value: "95%", label: "Would Recommend", color: "text-teal-600" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;