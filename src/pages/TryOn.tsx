import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CameraView } from "@/components/try-on/CameraView";
import { PositionControls } from "@/components/try-on/PositionControls";
import { ControlsBar } from "@/components/try-on/ControlsBar";
import { DressSelection } from "@/components/try-on/DressSelection";
import { TransparencyControl } from "@/components/try-on/TransparencyControl";
import { toast } from "sonner";
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  FlipHorizontal,
  Download,
} from "lucide-react";

const TryOn = () => {
  const [transparency, setTransparency] = useState([100]);
  const [selectedDress, setSelectedDress] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setTransparency([100]);
  };

  const adjustPosition = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10;
    const newPosition = { ...position };
    
    switch (direction) {
      case 'up':
        newPosition.y -= step;
        break;
      case 'down':
        newPosition.y += step;
        break;
      case 'left':
        newPosition.x -= step;
        break;
      case 'right':
        newPosition.x += step;
        break;
    }
    
    setPosition(newPosition);
  };

  const captureAndShare = async () => {
    try {
      // Create a canvas to capture the current view
      const canvas = document.createElement('canvas');
      // Access the video element using videoRef
      const video = document.querySelector('video');
      if (!video) return;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw the current frame
      ctx.drawImage(video, 0, 0);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'virtual-tryon.png';
        a.click();
        URL.revokeObjectURL(url);
        
        toast.success("Image captured! Ready to share.");
      });
    } catch (error) {
      toast.error("Failed to capture image. Please try again.");
    }
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
          <div className="lg:col-span-8 space-y-6">
            <CameraView
              position={position}
              transparency={transparency[0]}
              onReset={resetPosition}
            />
            <PositionControls
              onAdjustPosition={adjustPosition}
              onReset={resetPosition}
            />
            <ControlsBar onCapture={captureAndShare} />
          </div>

          {/* Right Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <DressSelection
              dresses={dresses}
              selectedDress={selectedDress}
              onSelectDress={setSelectedDress}
            />
            <TransparencyControl
              transparency={transparency}
              onTransparencyChange={setTransparency}
            />
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
