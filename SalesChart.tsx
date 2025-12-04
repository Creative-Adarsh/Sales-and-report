import React from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { SalesData, ChartType } from '../../types';

interface SalesChartProps {
  data: SalesData[];
  type: ChartType;
}

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(value);

export const SalesChart: React.FC<SalesChartProps> = ({ data, type }) => {
  
  // Common components for all charts to ensure consistency
  const CommonAxis = [
    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />,
    <XAxis 
      key="xaxis" 
      dataKey="month" 
      stroke="#64748b" 
      fontSize={12} 
      tickLine={false} 
      axisLine={false} 
    />,
    <YAxis 
      key="yaxis" 
      stroke="#64748b" 
      fontSize={12} 
      tickLine={false} 
      axisLine={false} 
      tickFormatter={(val) => `$${val / 1000}k`} 
    />,
    <Tooltip 
      key="tooltip"
      formatter={(value: number) => [formatCurrency(value), 'Sales']}
      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
    />,
    <Legend key="legend" wrapperStyle={{ paddingTop: '20px' }} />
  ];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            {CommonAxis}
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#4f46e5" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            {CommonAxis}
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#4f46e5" 
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            {CommonAxis}
            <Bar 
              dataKey="sales" 
              fill="#4f46e5" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
            />
          </BarChart>
        );
    }
  };

  if (data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400">
        No data available for the selected criteria.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      {renderChart()}
    </ResponsiveContainer>
  );
};
