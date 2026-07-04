import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { useSocket } from '../context/SocketContext';

const LiveDonationChart = () => {
  const { history } = useSocket();
  const [chartType, setChartType] = useState('line');

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-navy-200">
          <p className="text-sm font-bold text-navy-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ৳{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-8 text-center">
        <p className="text-navy-500">No data available for chart yet.</p>
        <p className="text-xs text-navy-400 mt-2">New data will appear here as transactions are recorded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-navy-100 p-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-navy-700">Donations vs Expenses</h3>
          <p className="text-xs text-navy-400">Live updates via WebSocket</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-navy-500 font-medium">Chart Type:</span>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              chartType === 'line' 
                ? 'bg-navy-700 text-white' 
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              chartType === 'bar' 
                ? 'bg-navy-700 text-white' 
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              chartType === 'area' 
                ? 'bg-navy-700 text-white' 
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            Area
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' && (
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                tickFormatter={(value) => `৳${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="donations" 
                stroke="#10b981" 
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6 }}
                name="Donations"
                isAnimationActive={true}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#ef4444' }}
                activeDot={{ r: 6 }}
                name="Expenses"
                isAnimationActive={true}
              />
            </LineChart>
          )}

          {chartType === 'bar' && (
            <BarChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                tickFormatter={(value) => `৳${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="donations" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="Donations"
                isAnimationActive={true}
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]}
                name="Expenses"
                isAnimationActive={true}
              />
            </BarChart>
          )}

          {chartType === 'area' && (
            <ComposedChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                tickFormatter={(value) => `৳${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="donations" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                name="Donations"
                isAnimationActive={true}
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.2}
                name="Expenses"
                isAnimationActive={true}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-between text-xs text-navy-400 border-t border-navy-100 pt-3">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live updates active
        </span>
        <span>{history.length} data points • Updates in real-time</span>
      </div>
    </div>
  );
};

export default LiveDonationChart;