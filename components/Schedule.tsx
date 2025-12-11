import React, { useState } from 'react';
import { TRAINING_PLAN } from '../constants';
import { ChevronDown, ChevronUp, Circle, CheckCircle2 } from 'lucide-react';

const Schedule: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(TRAINING_PLAN[0].id);

  const toggleWeek = (id: number) => {
    setExpandedWeek(expandedWeek === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tighter mb-2">THE REGIMEN</h2>
        <p className="text-zinc-500 font-mono text-sm">10 Weeks to the Finish Line</p>
      </div>

      <div className="space-y-4">
        {TRAINING_PLAN.map((week) => {
           const isExpanded = expandedWeek === week.id;
           
           return (
            <div key={week.id} className={`border ${isExpanded ? 'border-white bg-black' : 'border-zinc-800 bg-zinc-950'} transition-all duration-300`}>
                <button 
                    onClick={() => toggleWeek(week.id)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                >
                    <div>
                        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">{week.dates}</div>
                        <h3 className={`text-xl font-bold ${isExpanded ? 'text-white' : 'text-zinc-300 group-hover:text-white'} transition-colors`}>
                            {week.title}
                        </h3>
                    </div>
                    <div className={`text-zinc-500 ${isExpanded ? 'rotate-180 text-white' : ''} transition-transform`}>
                        <ChevronDown />
                    </div>
                </button>

                {isExpanded && (
                    <div className="border-t border-zinc-800">
                        {week.days.map((day, idx) => (
                            <div key={idx} className="flex items-start p-4 border-b border-zinc-900 last:border-0 hover:bg-zinc-900/50 transition-colors">
                                <div className="w-8 pt-1 mr-3 flex-shrink-0 text-zinc-600">
                                    {day.type === 'rest' ? <Circle className="w-4 h-4 opacity-30" /> : <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-sm font-bold text-white uppercase w-24">{day.day}</span>
                                        <span className={`text-xs font-mono px-2 py-0.5 border ${
                                            day.type === 'rest' ? 'border-zinc-800 text-zinc-600' : 
                                            day.type === 'race' ? 'border-white bg-white text-black' :
                                            'border-zinc-600 text-zinc-300'
                                        } uppercase tracking-wider`}>
                                            {day.activity}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {day.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default Schedule;
