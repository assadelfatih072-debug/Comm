import { useState, useMemo } from 'react';
import { getParsedData } from './data';
import { StartScreen } from './components/StartScreen';
import { QuizEngine } from './components/QuizEngine';
import { ResultsScreen } from './components/ResultsScreen';

export default function App() {
  const [appState, setAppState] = useState<'start' | 'quiz' | 'results'>('start');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  // Parse instructions only once
  const questions = useMemo(() => getParsedData(), []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-200 font-sans">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">MCQ</span>
            </div>
            Community Medicine
          </div>
          {appState !== 'start' && (
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  setAnswers({});
                  setAppState('start');
                }
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Quit Test
            </button>
          )}
        </div>
      </header>

      <main>
        {appState === 'start' && (
          <StartScreen 
            count={questions.length} 
            onStart={() => setAppState('quiz')} 
          />
        )}
        
        {appState === 'quiz' && (
          <QuizEngine 
            questions={questions} 
            onComplete={(finalAnswers) => {
              setAnswers(finalAnswers);
              setAppState('results');
            }} 
          />
        )}
        
        {appState === 'results' && (
          <ResultsScreen 
            questions={questions} 
            answers={answers} 
            onRestart={() => {
              setAnswers({});
              setAppState('start');
            }} 
          />
        )}
      </main>
    </div>
  );
}
