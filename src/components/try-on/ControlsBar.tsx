
import { ZoomIn, ZoomOut, FlipHorizontal, Share2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ControlsBarProps {
  onCapture: () => void;
}

export const ControlsBar = ({ onCapture }: ControlsBarProps) => {
  return (
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
          onClick={onCapture}
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
  );
};
