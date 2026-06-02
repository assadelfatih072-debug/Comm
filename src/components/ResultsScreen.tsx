import { Question } from '../data';
import { RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<number, string>;
  onRestart: () => void;
}

export function ResultsScreen({ questions, answers, onRestart }: ResultsScreenProps) {
  const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const percentage = Math.round((correctCount / questions.length) * 100);

  let message = "Good effort!";
  if (percentage >= 90) message = "Outstanding! You're an expert.";
  else if (percentage >= 75) message = "Great job! Strong understanding.";
  else if (percentage >= 50) message = "Well done, keep studying to improve!";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      {/* Score Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center mb-12"
      >
        <h2 className="text-xl sm:text-2xl font-medium text-slate-500 mb-2">Quiz Complete</h2>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">{message}</h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-10">
          <div className="text-center">
            <div className={`text-6xl sm:text-7xl font-black mb-2 ${percentage >= 75 ? 'text-teal-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
              {percentage}%
            </div>
            <div className="text-slate-500 font-medium">Final Score</div>
          </div>
          <div className="h-16 w-px bg-slate-200 hidden sm:block"></div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
              {correctCount} <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span>
            </div>
            <div className="text-slate-500 font-medium">Correct Answers</div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] mx-auto"
        >
          <RefreshCcw className="w-5 h-5" />
          Retake Quiz
        </button>
      </motion.div>

      {/* Detailed Review */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 px-4">Review Your Answers</h3>
        {questions.map((q, index) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              key={q.id} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {isCorrect ? (
                     <CheckCircle2 className="w-6 h-6 text-teal-500" />
                  ) : (
                     <XCircle className="w-6 h-6 text-rose-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-slate-800 mb-4">
                    <span className="text-slate-400 mr-2">{q.id}.</span> 
                    {q.text}
                  </h4>
                  
                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isOptCorrect = q.correctAnswer === opt.letter;
                      const isOptSelected = userAnswer === opt.letter;
                      
                      let style = "p-3 rounded-lg text-sm border-2 flex items-center gap-3 ";
                      
                      if (isOptCorrect) {
                        style += "border-teal-500 bg-teal-50 text-teal-900 font-medium";
                      } else if (isOptSelected && !isOptCorrect) {
                        style += "border-rose-300 bg-rose-50 text-rose-900";
                      } else {
                        style += "border-transparent bg-slate-50 text-slate-500";
                      }

                      return (
                        <div key={opt.letter} className={style}>
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                            ${isOptCorrect ? 'bg-teal-200 text-teal-800' : 
                              (isOptSelected ? 'bg-rose-200 text-rose-800' : 'bg-slate-200 text-slate-500')}
                          `}>
                            {opt.letter}
                          </span>
                          {opt.text}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
