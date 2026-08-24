'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { ComplianceTask, ComplianceTaskStatus } from '@omnigrc/types';
import { KanbanSquare, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const KANBAN_COLUMNS: Array<{ id: ComplianceTaskStatus; label: string; color: string }> = [
  { id: 'not_started', label: 'Not Started', color: 'border-slate-800 bg-slate-900/40' },
  { id: 'in_progress', label: 'In Progress', color: 'border-sky-800/50 bg-sky-950/20' },
  { id: 'ready_for_review', label: 'Ready for Review', color: 'border-amber-800/50 bg-amber-950/20' },
  { id: 'compliant', label: 'Compliant', color: 'border-emerald-800/50 bg-emerald-950/20' },
  { id: 'needs_attention', label: 'Needs Attention', color: 'border-rose-800/50 bg-rose-950/20' },
];

export default function ComplianceBoardPage() {
  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [rangeFilter, setRangeFilter] = useState<string>('all');

  const loadTasks = async () => {
    try {
      const endpoint = rangeFilter !== 'all' ? `/compliance/tasks?range=${rangeFilter}` : '/compliance/tasks';
      const data = await fetchApi<ComplianceTask[]>(endpoint);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [rangeFilter]);

  const handleStatusChange = async (taskId: string, newStatus: ComplianceTaskStatus) => {
    try {
      await fetchApi(`/compliance/tasks/${taskId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      loadTasks();
    } catch (err: any) {
      alert(`Error updating task status: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-emerald-200 to-sky-200 flex items-center gap-2">
            <KanbanSquare className="w-7 h-7 text-emerald-400 flex-shrink-0" />
            Compliance Kanban Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage compliance task execution workflows with 30/60/90-day testing views.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800/90 p-1 rounded-xl text-xs self-start sm:self-auto shadow-md">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'overdue', label: 'Overdue' },
            { id: '30_days', label: 'Next 30 Days' },
            { id: '31_60_days', label: '31-60 Days' },
            { id: '61_90_days', label: '61-90 Days' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRangeFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all text-[11px] sm:text-xs ${
                rangeFilter === item.id ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Container - Horizontally scrollable on mobile portrait/landscape */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 min-w-[1200px] sm:min-w-0">
          {KANBAN_COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                className={`w-[260px] sm:w-auto p-4 rounded-2xl border ${col.color} flex flex-col space-y-3 min-h-[480px] flex-shrink-0 sm:flex-shrink shadow-xl`}
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <h3 className="font-extrabold text-slate-200 text-xs tracking-wider uppercase">{col.label}</h3>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="glass-card p-3.5 rounded-xl border border-slate-800/90 space-y-2 hover:border-sky-500/40 transition-all card-3d"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          task.priority === 'critical' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" /> {task.due_date || 'No Date'}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-100 text-xs leading-snug">{task.title}</h4>
                      {task.notes && <p className="text-[11px] text-slate-400 leading-snug">{task.notes}</p>}

                      {/* Status Selector */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-semibold">Move to:</span>
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value as ComplianceTaskStatus)}
                          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="ready_for_review">Ready for Review</option>
                          <option value="compliant">Compliant</option>
                          <option value="needs_attention">Needs Attention</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
