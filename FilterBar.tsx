import React from 'react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { FilterState, ChartType } from '../../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <Select
          label="Select Year"
          className="w-full md:w-1/4"
          value={filters.year}
          onChange={(e) => onFilterChange('year', e.target.value === 'all' ? 'all' : Number(e.target.value))}
          options={[
            { label: 'All Years', value: 'all' },
            { label: '2024', value: 2024 },
            { label: '2023', value: 2023 },
            { label: '2022', value: 2022 },
          ]}
        />
        
        <Select
          label="Chart Type"
          className="w-full md:w-1/4"
          value={filters.chartType}
          onChange={(e) => onFilterChange('chartType', e.target.value as ChartType)}
          options={[
            { label: 'Bar Chart', value: 'bar' },
            { label: 'Line Chart', value: 'line' },
            { label: 'Area Chart', value: 'area' },
          ]}
        />

        <Input
          label="Min Sales Threshold ($)"
          type="number"
          className="w-full md:w-1/4"
          value={filters.threshold || ''}
          placeholder="0"
          onChange={(e) => onFilterChange('threshold', Number(e.target.value))}
          min={0}
          step={1000}
        />

        <div className="w-full md:w-1/4 pb-1 text-xs text-slate-400 text-right">
          Showing data for {filters.year === 'all' ? '2022-2024' : filters.year}
        </div>
      </div>
    </Card>
  );
};