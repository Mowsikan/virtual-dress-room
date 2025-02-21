
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    initializeCamera();
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
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
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="text-primary hover:text-accent transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-semibold text-primary">Virtual Try-On</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video bg-black rounded-2xl overflow-hidden"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="mb-4">Camera access required</p>
                    <button
                      onClick={initializeCamera}
                      className="px-4 py-2 bg-accent rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      Enable Camera
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Controls</h2>
              <div className="space-y-4">
                <button
                  onClick={toggleCamera}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Switch Camera
                </button>
                <button
                  onClick={() => toast.success("Screenshot captured!")}
                  className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Capture Screenshot
                </button>
                <button
                  onClick={() => toast.info("Resetting position...")}
                  className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Reset Position
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
