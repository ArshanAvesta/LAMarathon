import React, { useMemo } from 'react';
import { RunLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, TrendingUp, Calendar, Zap } from 'lucide-react';
import { TRAINING_PLAN } from '../constants';

interface DashboardProps {
  logs: RunLog[];
  onNavigateToLog: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, onNavigateToLog }) => {
  const totalMiles = useMemo(() => logs.reduce((acc, log) => acc + log.distance, 0), [logs]);
  const totalRuns = logs.length;
  
  // Calculate this week's mileage (Mock logic assuming current date or last entries)
  const recentLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const chartData = useMemo(() => {
    // Group by runner name for the chart
    const runnerMap = new Map<string, number>();
    logs.forEach(log => {
      const current = runnerMap.get(log.runnerName) || 0;
      runnerMap.set(log.runnerName, current + log.distance);
    });
    return Array.from(runnerMap.entries()).map(([name, miles]) => ({ name, miles }));
  }, [logs]);

  // Find next big event
  const nextRace = TRAINING_PLAN[TRAINING_PLAN.length - 1];

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">LA MARATHON</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Training Dashboard</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
           <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Target Date</div>
           <div className="text-xl font-bold text-white">March 8</div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-none hover:border-zinc-600 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <TrendingUp className="text-zinc-400 w-5 h-5" />
            <span className="text-xs font-mono text-zinc-600 uppercase">Total Dist</span>
          </div>
          <div className="text-3xl font-bold text-white">{totalMiles.toFixed(1)} <span className="text-base text-zinc-500 font-normal">mi</span></div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-none hover:border-zinc-600 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <Zap className="text-zinc-400 w-5 h-5" />
            <span className="text-xs font-mono text-zinc-600 uppercase">Total Runs</span>
          </div>
          <div className="text-3xl font-bold text-white">{totalRuns}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-none hover:border-zinc-600 transition-colors col-span-2 md:col-span-2">
            <div className="flex justify-between items-start mb-2">
            <Trophy className="text-white w-5 h-5" />
            <span className="text-xs font-mono text-zinc-600 uppercase">Leaderboard</span>
          </div>
          <div className="h-16 w-full">
            {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} layout="vertical" margin={{top:0, left:0, right:0, bottom:0}}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" hide width={50}/>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} 
                     itemStyle={{ color: '#fff' }}
                     cursor={{fill: 'transparent'}}
                   />
                   <Bar dataKey="miles" barSize={10}>
                     {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill="#fff" />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-zinc-600 text-sm italic">
                    No runs logged yet.
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Recent Logs</h2>
            <button onClick={onNavigateToLog} className="text-xs font-mono uppercase underline decoration-zinc-600 hover:text-zinc-300">
                + Log Run
            </button>
          </div>
          <div className="border-t border-zinc-800">
            {recentLogs.length === 0 ? (
                <div className="py-8 text-center text-zinc-600">Start logging your training to see progress.</div>
            ) : (
                recentLogs.map((log) => (
                <div key={log.id} className="py-4 border-b border-zinc-900 flex justify-between items-center group hover:bg-zinc-950 transition-colors">
                    <div>
                        <div className="text-sm font-bold text-white">{log.runnerName}</div>
                        <div className="text-xs text-zinc-500 font-mono">{log.date}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-mono font-bold text-white">{log.distance} <span className="text-xs text-zinc-500">mi</span></div>
                        <div className="text-xs text-zinc-500 font-mono">{log.pace}/mi</div>
                    </div>
                </div>
                ))
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Upcoming Key Session</h2>
            <Calendar className="w-5 h-5 text-zinc-500"/>
          </div>
           <div className="bg-zinc-950 border border-zinc-800 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10">
                    <div className="text-sm font-mono text-zinc-500 uppercase mb-2">Week 7 • Saturday</div>
                    <h3 className="text-2xl font-bold text-white mb-2">The 20 Miler</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        14 miles easy, 5 miles at race pace, 1 mile cool down. This is the peak of your training.
                    </p>
                    <div className="inline-block border border-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Peak Phase
                    </div>
                </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
