import React, { useState } from 'react';
import { RunLog } from '../types';
import { Clock, Navigation, User, FileText, Plus } from 'lucide-react';

interface RunLogProps {
  onAddLog: (log: RunLog) => void;
}

const RunLogModule: React.FC<RunLogProps> = ({ onAddLog }) => {
  const [formData, setFormData] = useState({
    runnerName: 'Me',
    distance: '',
    hours: '0',
    minutes: '00',
    seconds: '00',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total duration string
    const h = parseInt(formData.hours) || 0;
    const m = parseInt(formData.minutes) || 0;
    const s = parseInt(formData.seconds) || 0;
    
    const totalMinutes = h * 60 + m + s / 60;
    const dist = parseFloat(formData.distance);

    if (!dist || dist <= 0) return;

    // Calculate Pace
    const paceDecimal = totalMinutes / dist;
    const paceMin = Math.floor(paceDecimal);
    const paceSec = Math.round((paceDecimal - paceMin) * 60);
    const paceStr = `${paceMin}:${paceSec.toString().padStart(2, '0')}`;

    const durationStr = `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    const newLog: RunLog = {
      id: Date.now().toString(),
      date: formData.date,
      runnerName: formData.runnerName,
      distance: dist,
      duration: durationStr,
      pace: paceStr,
      notes: formData.notes
    };

    onAddLog(newLog);
    // Reset essential fields
    setFormData(prev => ({ ...prev, distance: '', notes: '' }));
  };

  const inputClass = "w-full bg-black border-b border-zinc-700 text-white p-3 focus:outline-none focus:border-white transition-colors placeholder-zinc-600 font-mono";
  const labelClass = "block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h2 className="text-3xl font-extrabold tracking-tighter">LOG RUN</h2>
        <p className="text-zinc-500 text-sm mt-1">Record your miles. Track your pace.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className={labelClass}><User className="inline w-3 h-3 mr-1"/> Runner</label>
                <select 
                    className={inputClass}
                    value={formData.runnerName}
                    onChange={e => setFormData({...formData, runnerName: e.target.value})}
                >
                    <option value="Me">Me</option>
                    <option value="Friend 1">Friend 1</option>
                    <option value="Friend 2">Friend 2</option>
                </select>
            </div>
            <div>
                 <label className={labelClass}>Date</label>
                 <input 
                    type="date" 
                    className={inputClass}
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                 />
            </div>
        </div>

        <div>
            <label className={labelClass}><Navigation className="inline w-3 h-3 mr-1"/> Distance (Miles)</label>
            <input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                className="w-full bg-black border-b border-zinc-700 text-white text-4xl font-bold py-4 focus:outline-none focus:border-white transition-colors placeholder-zinc-800 font-mono"
                value={formData.distance}
                onChange={e => setFormData({...formData, distance: e.target.value})}
                required
            />
        </div>

        <div>
            <label className={labelClass}><Clock className="inline w-3 h-3 mr-1"/> Duration</label>
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <input 
                        type="number" 
                        placeholder="0" 
                        className={inputClass}
                        value={formData.hours}
                        onChange={e => setFormData({...formData, hours: e.target.value})}
                        min="0"
                    />
                    <span className="text-xs text-zinc-600 font-mono">HR</span>
                </div>
                <div className="text-zinc-600 font-mono text-xl pb-3">:</div>
                <div className="flex-1">
                    <input 
                        type="number" 
                        placeholder="00" 
                        className={inputClass}
                        value={formData.minutes}
                        onChange={e => setFormData({...formData, minutes: e.target.value})}
                        min="0" max="59"
                    />
                    <span className="text-xs text-zinc-600 font-mono">MIN</span>
                </div>
                <div className="text-zinc-600 font-mono text-xl pb-3">:</div>
                <div className="flex-1">
                    <input 
                        type="number" 
                        placeholder="00" 
                        className={inputClass}
                        value={formData.seconds}
                        onChange={e => setFormData({...formData, seconds: e.target.value})}
                        min="0" max="59"
                    />
                    <span className="text-xs text-zinc-600 font-mono">SEC</span>
                </div>
            </div>
        </div>

        <div>
            <label className={labelClass}><FileText className="inline w-3 h-3 mr-1"/> Notes</label>
            <textarea 
                className={`${inputClass} border border-zinc-800 focus:border-white h-24 mt-2`}
                placeholder="How did it feel? (Easy, Hard, Interval splits...)"
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
            />
        </div>

        <button 
            type="submit" 
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-5 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
        >
            <Plus className="w-5 h-5"/> Save Run
        </button>

      </form>
    </div>
  );
};

export default RunLogModule;
