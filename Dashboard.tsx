import React, { useState, useMemo } from 'react';
import { MOCK_SALES_DATA } from '../../constants';
import { FilterState } from '../../types';
import { FilterBar } from './FilterBar';
import { SalesChart } from '../charts/SalesChart';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { downloadCSV, printReport } from '../../utils/exportUtils';

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    year: 'all',
    threshold: 0,
    chartType: 'area', // More professional default
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter Data Logic
  const filteredData = useMemo(() => {
    return MOCK_SALES_DATA.filter((item) => {
      const matchYear = filters.year === 'all' || item.year === filters.year;
      const matchThreshold = item.sales >= filters.threshold;
      return matchYear && matchThreshold;
    });
  }, [filters]);

  const chartData = useMemo(() => {
    return filteredData.map(d => ({
      ...d,
      month: filters.year === 'all' ? `${d.month} '${d.year.toString().slice(2)}` : d.month
    }));
  }, [filteredData, filters.year]);

  // Calculate quick stats
  const totalSales = useMemo(() => filteredData.reduce((acc, curr) => acc + curr.sales, 0), [filteredData]);
  const avgSales = useMemo(() => filteredData.length ? totalSales / filteredData.length : 0, [totalSales, filteredData.length]);
  const customerCount = useMemo(() => filteredData.reduce((acc, curr) => acc + curr.customerCount, 0), [filteredData]);

  // Export Handlers
  const handleDownloadCSV = () => downloadCSV(filteredData, `sales-report-${filters.year}.csv`);
  const handlePrint = () => printReport();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Performance metrics and analytics.</p>
        </div>
        <div className="flex space-x-3 no-print">
          <Button variant="outline" onClick={handlePrint} icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          }>
            Print Report
          </Button>
          <Button onClick={handleDownloadCSV} icon={
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          }>
            Export CSV
          </Button>
        </div>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Revenue</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalSales)}
              </div>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-emerald-600 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            +12.5% from previous period
          </div>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
           <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Avg. Monthly</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(avgSales)}
              </div>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
          </div>
           <div className="mt-4 text-xs text-slate-400 font-medium">
             Based on {filteredData.length} active months
          </div>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
           <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Customers</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {customerCount.toLocaleString()}
              </div>
            </div>
             <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
          </div>
           <div className="mt-4 text-xs text-emerald-600 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            +5.4% new acquisition
          </div>
        </Card>
      </div>

      {/* Main Chart Area */}
      <Card title="Revenue Trends" description="Monthly sales performance over time" className="min-h-[500px]">
        <div className="mt-4">
          <SalesChart data={chartData} type={filters.chartType} />
        </div>
      </Card>
    </div>
  );
};
