
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface TransparencyControlProps {
  transparency: number[];
  onTransparencyChange: (value: number[]) => void;
}

export const TransparencyControl = ({ transparency, onTransparencyChange }: TransparencyControlProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Transparency</h3>
      <Slider
        value={transparency}
        onValueChange={onTransparencyChange}
        max={100}
        step={1}
        className="w-full"
      />
      <p className="text-sm text-gray-600 mt-2">
        Opacity: {transparency[0]}%
      </p>
    </motion.div>
  );
};
