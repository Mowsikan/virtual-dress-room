
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
  FlipHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  RefreshCw
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const TryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transparency, setTransparency] = useState([100]);
  const [selectedDress, setSelectedDress] = useState(0);
  const [showKeypoints, setShowKeypoints] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const captureAndShare = async () => {
    try {
      // Create a canvas to capture the current view
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
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

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setTransparency([100]);
    toast.success("Position and transparency reset!");
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
                style={{ opacity: transparency[0] / 100 }}
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
                  onClick={resetPosition}
                  className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <RefreshCw className="h-6 w-6 text-primary" />
                </button>
              </div>
            </motion.div>

            {/* Position Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-xl shadow-lg grid grid-cols-3 gap-4 place-items-center"
            >
              <div />
              <button
                onClick={() => adjustPosition('up')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowUp className="h-6 w-6 text-primary" />
              </button>
              <div />
              <button
                onClick={() => adjustPosition('left')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={resetPosition}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <RotateCw className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={() => adjustPosition('right')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowRight className="h-6 w-6 text-primary" />
              </button>
              <div />
              <button
                onClick={() => adjustPosition('down')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowDown className="h-6 w-6 text-primary" />
              </button>
              <div />
            </motion.div>

            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between"
            >
              <div className="flex space-x-4">
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
              <div className="flex space-x-2">
                <button
                  onClick={captureAndShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => toast.success("Ready to share your look!")}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
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
                    onClick={() => {
                      setSelectedDress(index);
                      toast.success(`Selected: ${dress.name}`);
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition-all hover:scale-[1.02] ${
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
              <p className="text-sm text-gray-600 mt-2">
                Opacity: {transparency[0]}%
              </p>
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
