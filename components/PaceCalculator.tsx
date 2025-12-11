import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

type CalcMode = 'PACE' | 'TIME' | 'DISTANCE';

const PaceCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>('PACE');
  
  // Inputs
  const [dist, setDist] = useState<string>('26.2'); // Default Marathon
  const [timeH, setTimeH] = useState<string>('4');
  const [timeM, setTimeM] = useState<string>('00');
  const [timeS, setTimeS] = useState<string>('00');
  const [paceM, setPaceM] = useState<string>('9');
  const [paceS, setPaceS] = useState<string>('09');

  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const d = parseFloat(dist);
    const totalTimeMin = (parseInt(timeH)||0)*60 + (parseInt(timeM)||0) + (parseInt(timeS)||0)/60;
    const totalPaceMin = (parseInt(paceM)||0) + (parseInt(paceS)||0)/60;

    if (mode === 'PACE') {
        if (!d || totalTimeMin === 0) return;
        const p = totalTimeMin / d;
        const pm = Math.floor(p);
        const ps = Math.round((p - pm) * 60);
        setResult(`${pm}:${ps.toString().padStart(2, '0')} /mi`);
    } else if (mode === 'TIME') {
        if (!d || totalPaceMin === 0) return;
        const t = d * totalPaceMin;
        const h = Math.floor(t / 60);
        const rem = t % 60;
        const m = Math.floor(rem);
        const s = Math.round((rem - m) * 60);
        setResult(`${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    } else if (mode === 'DISTANCE') {
        if (totalPaceMin === 0 || totalTimeMin === 0) return;
        const distResult = totalTimeMin / totalPaceMin;
        setResult(`${distResult.toFixed(2)} mi`);
    }
  };

  useEffect(() => {
    calculate();
  }, [dist, timeH, timeM, timeS, paceM, paceS, mode]);

  const inputClass = "bg-zinc-900 border border-zinc-800 text-white p-3 text-center font-mono focus:border-white outline-none w-full";
  const labelClass = "text-xs text-zinc-500 uppercase tracking-widest mb-1 block text-center";

  return (
    <div className="max-w-xl mx-auto border border-zinc-800 bg-zinc-950 p-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Calculator className="w-6 h-6"/>
        <h2 className="text-2xl font-bold uppercase tracking-tighter">Pace Calculator</h2>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {(['PACE', 'TIME', 'DISTANCE'] as CalcMode[]).map(m => (
            <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border ${mode === m ? 'bg-white text-black border-white' : 'text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
            >
                Calc {m}
            </button>
        ))}
      </div>

      <div className="space-y-6">
        {mode !== 'DISTANCE' && (
            <div className="animate-fade-in">
                <label className={labelClass}>Distance (Miles)</label>
                <input 
                    type="number" 
                    value={dist} 
                    onChange={(e) => setDist(e.target.value)}
                    className={inputClass}
                />
                 <div className="flex justify-center gap-2 mt-2">
                    <button onClick={() => setDist('3.1')} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 uppercase hover:text-white">5K</button>
                    <button onClick={() => setDist('6.2')} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 uppercase hover:text-white">10K</button>
                    <button onClick={() => setDist('13.1')} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 uppercase hover:text-white">Half</button>
                    <button onClick={() => setDist('26.2')} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 uppercase hover:text-white">Marathon</button>
                </div>
            </div>
        )}

        {mode !== 'TIME' && (
             <div className="animate-fade-in">
                <label className={labelClass}>Time (Hr : Min : Sec)</label>
                <div className="flex gap-2">
                    <input type="number" value={timeH} onChange={e => setTimeH(e.target.value)} className={inputClass} placeholder="00" />
                    <input type="number" value={timeM} onChange={e => setTimeM(e.target.value)} className={inputClass} placeholder="00" />
                    <input type="number" value={timeS} onChange={e => setTimeS(e.target.value)} className={inputClass} placeholder="00" />
                </div>
            </div>
        )}

        {mode !== 'PACE' && (
             <div className="animate-fade-in">
                <label className={labelClass}>Pace (Min : Sec / mi)</label>
                <div className="flex gap-2">
                    <input type="number" value={paceM} onChange={e => setPaceM(e.target.value)} className={inputClass} placeholder="09" />
                    <input type="number" value={paceS} onChange={e => setPaceS(e.target.value)} className={inputClass} placeholder="00" />
                </div>
            </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
        <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Result</div>
        <div className="text-4xl font-mono font-bold text-white flex justify-center items-center gap-3">
            <ArrowRight className="w-6 h-6 text-zinc-600"/>
            {result}
        </div>
      </div>
    </div>
  );
};

export default PaceCalculator;
