import { Activity, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';

interface StartScreenProps {
  onStart: () => void;
  count: number;
}

export function StartScreen({ onStart, count }: StartScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-2xl mx-auto px-6"
    >
      <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
        <Stethoscope className="w-10 h-10" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-slate-900 mb-4">
        Community Medicine
      </h1>
      
      <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
        Test your knowledge with these {count} multiple-choice questions covering public health, epidemiology, and preventive medicine.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          Start Practice
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200 w-full text-slate-400 text-sm">
        Based on the provided Community Medicine summary notes.
      </div>
    </motion.div>
  );
}
