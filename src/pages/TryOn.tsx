
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(true);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
            </motion.div>

            {/* Tutorial Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {tips.map((tip, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
                  <p className="text-primary/80 text-sm">{tip}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6">Customization Controls</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Camera Options</h3>
                  <button
                    onClick={toggleCamera}
                    className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Switch Camera
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Capture Options</h3>
                  <button
                    onClick={() => toast.success("Screenshot captured!")}
                    className="w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors mb-3"
                  >
                    Capture Screenshot
                  </button>
                  <button
                    onClick={() => toast.info("Starting recording...")}
                    className="w-full px-4 py-3 bg-accent/80 text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Record Video
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Try-On Settings</h3>
                  <button
                    onClick={() => toast.info("Resetting position...")}
                    className="w-full px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors mb-3"
                  >
                    Reset Position
                  </button>
                  <button
                    onClick={() => toast.info("Opening style gallery...")}
                    className="w-full px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    Browse Styles
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-primary/5 p-6 rounded-2xl"
            >
              <h3 className="font-semibold mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Ensure good lighting for best results</li>
                <li>• Stand 2-3 feet away from the camera</li>
                <li>• Keep your whole body in frame</li>
                <li>• Try different poses to see all angles</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const tips = [
  "Move naturally to see how the clothes flow with your body",
  "Use gestures to adjust fit and style in real-time",
  "Share your look with friends for instant feedback",
];

export default TryOn;
