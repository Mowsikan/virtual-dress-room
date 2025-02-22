
import { useEffect, useRef, useState } from "react";
import { Camera, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CameraViewProps {
  position: { x: number; y: number };
  transparency: number;
  onReset: () => void;
}

export const CameraView = ({ position, transparency, onReset }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showKeypoints, setShowKeypoints] = useState(false);

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity: transparency / 100 }}
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

      {/* Floating Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={toggleCamera}
          className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Camera className="h-6 w-6 text-primary" />
        </button>
        <button
          onClick={() => setShowKeypoints(!showKeypoints)}
          className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Eye className="h-6 w-6 text-primary" />
        </button>
        <button
          onClick={onReset}
          className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <RefreshCw className="h-6 w-6 text-primary" />
        </button>
      </div>
    </motion.div>
  );
};
