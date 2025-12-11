import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CalendarDays, PlusCircle, Calculator, Bot } from 'lucide-react';
import { Tab, RunLog } from './types';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import RunLogModule from './components/RunLog';
import PaceCalculator from './components/PaceCalculator';
import AICoach from './components/AICoach';

const TABS: Tab[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'schedule', label: 'Plan', icon: CalendarDays },
  { id: 'logger', label: 'Log Run', icon: PlusCircle },
  { id: 'calculator', label: 'Pace', icon: Calculator },
  { id: 'coach', label: 'Coach', icon: Bot },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('dashboard');
  const [runLogs, setRunLogs] = useState<RunLog[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('laMarathonLogs');
    if (saved) {
      try {
        setRunLogs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load logs");
      }
    }
  }, []);

  const handleAddLog = (log: RunLog) => {
    const updated = [log, ...runLogs];
    setRunLogs(updated);
    localStorage.setItem('laMarathonLogs', JSON.stringify(updated));
    setActiveTab('dashboard'); // Redirect to dashboard after log
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-white selection:text-black">
      
      {/* Mobile Sticky Header */}
      <div className="md:hidden border-b border-zinc-900 p-4 sticky top-0 bg-black/90 backdrop-blur-md z-50 flex justify-between items-center">
        <span className="font-bold tracking-tighter text-lg">LA26.2</span>
        <div className="text-xs font-mono text-zinc-500">10 WEEKS</div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="hidden md:flex flex-col w-64 border-r border-zinc-900 h-screen sticky top-0 p-6">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tighter">LA26.2</h1>
          <p className="text-xs text-zinc-500 font-mono mt-2">MARATHON PREP</p>
        </div>

        <div className="space-y-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-black translate-x-2' 
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-900">
            <p className="text-[10px] text-zinc-600 font-mono leading-relaxed">
                CONSISTENCY IS KEY.<br/>LISTEN TO YOUR BODY.<br/>RUN HARD.
            </p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 pb-24 md:pb-12 max-w-5xl mx-auto w-full">
        {activeTab === 'dashboard' && <Dashboard logs={runLogs} onNavigateToLog={() => setActiveTab('logger')} />}
        {activeTab === 'schedule' && <Schedule />}
        {activeTab === 'logger' && <RunLogModule onAddLog={handleAddLog} />}
        {activeTab === 'calculator' && <PaceCalculator />}
        {activeTab === 'coach' && <AICoach />}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-900 flex justify-around p-2 z-50 pb-safe">
        {TABS.map((tab) => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           return (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-none flex-1 ${isActive ? 'text-white' : 'text-zinc-600'}`}
             >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">{tab.label}</span>
             </button>
           )
        })}
      </div>

    </div>
  );
};

export default App;
