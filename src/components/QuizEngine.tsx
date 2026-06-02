import { useState } from 'react';
import { Question } from '../data';
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizEngineProps {
  questions: Question[];
  onComplete: (answers: Record<number, string>) => void;
}

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const q = questions[currentIndex];
  const selectedAns = answers[q.id];
  const isAnswered = !!selectedAns;

  const handleSelect = (letter: string) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [q.id]: letter }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
    } else {
      onComplete(answers);
    }
  };

  // Progress percentage
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-4">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-teal-600">{Math.round(progress)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="bg-teal-500 h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div 
        key={q.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
          <span className="text-slate-400 mr-2">{q.id}.</span>
          {q.text}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = selectedAns === opt.letter;
            const isCorrect = q.correctAnswer === opt.letter;
            
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ";
            let icon = null;

            if (!isAnswered) {
              btnClass += "border-slate-100 bg-slate-50 hover:border-teal-300 hover:bg-teal-50 text-slate-700 cursor-pointer";
            } else {
              if (isSelected && isCorrect) {
                btnClass += "border-teal-500 bg-teal-50 text-teal-800";
                icon = <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />;
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-400 bg-rose-50 text-rose-800";
                icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              } else if (!isSelected && isCorrect) {
                btnClass += "border-teal-500 bg-teal-50 text-teal-800 opacity-80";
                icon = <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />;
              } else {
                btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={opt.letter}
                onClick={() => handleSelect(opt.letter)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0
                  ${isAnswered && (isSelected || isCorrect) ? 'bg-white shadow-sm' : 'bg-white shadow-sm text-slate-500 group-hover:text-teal-600'}`}>
                  {opt.letter}
                </span>
                <span className="flex-1 text-base sm:text-lg">{opt.text}</span>
                {isAnswered && icon}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Next Button */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
