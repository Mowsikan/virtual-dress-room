
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

interface PositionControlsProps {
  onAdjustPosition: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onReset: () => void;
}

export const PositionControls = ({ onAdjustPosition, onReset }: PositionControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-xl shadow-lg grid grid-cols-3 gap-4 place-items-center"
    >
      <div />
      <button
        onClick={() => onAdjustPosition('up')}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <ArrowUp className="h-6 w-6 text-primary" />
      </button>
      <div />
      <button
        onClick={() => onAdjustPosition('left')}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <ArrowLeft className="h-6 w-6 text-primary" />
      </button>
      <button
        onClick={onReset}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <RotateCw className="h-6 w-6 text-primary" />
      </button>
      <button
        onClick={() => onAdjustPosition('right')}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <ArrowRight className="h-6 w-6 text-primary" />
      </button>
      <div />
      <button
        onClick={() => onAdjustPosition('down')}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <ArrowDown className="h-6 w-6 text-primary" />
      </button>
      <div />
    </motion.div>
  );
};
