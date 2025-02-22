import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [-200, 200],
            y: [-200, 200],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "10%", left: "20%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [200, -200],
            y: [200, -200],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "30%", right: "10%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [-150, 150],
            y: [100, -100],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ bottom: "20%", left: "30%" }}
        />
      </div>

      <Navigation />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Revolutionary Virtual Try-On Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step into the future of fashion with our cutting-edge WebAR digital trial room.
            Experience seamless, real-time virtual try-ons powered by advanced AI and computer vision technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/try-on"
              className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-white font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Start Try-On
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-8 py-3 rounded-full border-2 border-primary text-primary font-medium transform transition-all duration-200 hover:bg-primary hover:text-white"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Experience the Future of Shopping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dress Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Featured Collection
          </h2>
          <div className="flex overflow-x-auto pb-8 space-x-6">
            {dresses.map((dress, index) => (
              <div
                key={index}
                className="flex-none w-64 bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-80 bg-gray-200">
                  {/* Placeholder for dress image */}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{dress.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{dress.style}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const highlightFeatures = [
  {
    title: "Real-Time Try-On",
    description: "See how clothes look on you instantly with our advanced AR technology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Smart Size Recommendations",
    description: "Get accurate size suggestions based on your measurements",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Share & Compare",
    description: "Share your virtual try-ons and get instant feedback from friends",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
];

const dresses = [
  { name: "Summer Breeze Dress", style: "Casual" },
  { name: "Evening Elegance", style: "Formal" },
  { name: "Urban Chic", style: "Smart Casual" },
  { name: "Bohemian Dream", style: "Boho" },
  { name: "Classic Grace", style: "Classic" },
];

const faqs = [
  {
    question: "How accurate is the virtual try-on?",
    answer: "Our AR technology provides highly accurate representations of how garments will look on you, using advanced body tracking and real-time cloth simulation.",
  },
  {
    question: "What devices are supported?",
    answer: "The virtual try-on works on most modern smartphones, tablets, and computers with a camera. We recommend using the latest version of Chrome, Safari, or Firefox.",
  },
  {
    question: "Can I share my virtual try-on?",
    answer: "Yes! You can easily capture and share your virtual try-on experience with friends and family through social media or direct messaging.",
  },
  {
    question: "How do I get the best results?",
    answer: "For best results, ensure good lighting, stand 2-3 feet from the camera, and wear fitting clothes. The background should be clutter-free.",
  },
];

export default Index;
