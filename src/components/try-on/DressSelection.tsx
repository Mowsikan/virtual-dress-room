
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Dress {
  name: string;
  style: string;
}

interface DressSelectionProps {
  dresses: Dress[];
  selectedDress: number;
  onSelectDress: (index: number) => void;
}

export const DressSelection = ({ dresses, selectedDress, onSelectDress }: DressSelectionProps) => {
  return (
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
              onSelectDress(index);
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
  );
};
