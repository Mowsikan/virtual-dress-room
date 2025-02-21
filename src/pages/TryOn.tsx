
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  Camera, 
  Share2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  FlipHorizontal 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const TryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transparency, setTransparency] = useState([100]);
  const [selectedDress, setSelectedDress] = useState(0);

  useEffect(() => {
    initializeCamera();
  }, []);

  const initializeCamera = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        toast.success("Camera initialized successfully!");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCamera = async () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
    await initializeCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="text-primary hover:text-accent transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-semibold text-primary">Virtual Try-On Studio</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!cameraActive && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-center">
                    <p className="mb-4 text-lg">Camera access required</p>
                    <button
                      onClick={initializeCamera}
                      className="px-6 py-3 bg-accent rounded-lg hover:bg-opacity-90 transition-colors transform hover:scale-105"
                    >
                      Enable Camera
                    </button>
                  </div>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}

              {/* Floating Camera Switch Button */}
              <button
                onClick={toggleCamera}
                className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Camera className="h-6 w-6 text-primary" />
              </button>
            </motion.div>

            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-white p-4 rounded-xl shadow-lg flex items-center justify-between"
            >
              <div className="flex space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <RotateCw className="h-6 w-6 text-primary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ZoomIn className="h-6 w-6 text-primary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ZoomOut className="h-6 w-6 text-primary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FlipHorizontal className="h-6 w-6 text-primary" />
                </button>
              </div>
              <button
                onClick={() => toast.success("Image captured and ready to share!")}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </motion.div>
          </div>

          {/* Right Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dress Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Select Dress</h3>
              <div className="space-y-4">
                {dresses.map((dress, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDress(index)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedDress === index
                        ? "border-accent bg-accent/5"
                        : "border-gray-200 hover:border-accent/50"
                    }`}
                  >
                    <h4 className="font-medium">{dress.name}</h4>
                    <p className="text-sm text-gray-600">{dress.style}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Transparency Control */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Transparency</h3>
              <Slider
                value={transparency}
                onValueChange={setTransparency}
                max={100}
                step={1}
                className="w-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Tutorial Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {tips.map((tip, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
              <p className="text-primary/80 text-sm">{tip}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const tips = [
  "Move naturally to see how the clothes flow with your body",
  "Use gestures to adjust fit and style in real-time",
  "Share your look with friends for instant feedback",
];

const dresses = [
  { name: "Summer Breeze Dress", style: "Casual Summer Wear" },
  { name: "Evening Elegance", style: "Formal Evening Gown" },
  { name: "Urban Chic", style: "Smart Casual" },
  { name: "Bohemian Dream", style: "Boho Style" },
  { name: "Classic Grace", style: "Timeless Classic" },
];

export default TryOn;
