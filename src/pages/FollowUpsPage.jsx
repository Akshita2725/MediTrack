import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export function FollowUpsPage() {
  const { followUps, updateFollowUpStatus } = useApp();
  const [filter, setFilter] = useState('All');

  const filtered = followUps.filter((f) => {
    if (filter === 'All') return true;
    return f.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Follow-Ups</h1>
          <p className="text-gray-500 text-sm">Track post-consultation checkups and patient care plans</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['All', 'Pending', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No follow-ups found in this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Attending Doctor</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Condition / Notes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{item.patientName}</div>
                      <div className="text-xs text-gray-400">{item.contact || 'No phone'}</div>
                    </td>
                    <td className="p-3 text-gray-700">{item.doctorName}</td>
                    <td className="p-3 text-gray-600 font-medium">{item.dueDate || 'Next week'}</td>
                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {item.diagnosis || item.notes || 'Routine follow-up'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() =>
                          updateFollowUpStatus(
                            item.id,
                            item.status === 'Completed' ? 'Pending' : 'Completed'
                          )
                        }
                        className={`text-xs px-3 py-1.5 rounded font-medium transition ${
                          item.status === 'Completed'
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {item.status === 'Completed' ? 'Reopen' : 'Mark Done'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
