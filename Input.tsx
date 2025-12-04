import React from 'react';
import { InputProps } from '../../types';

export const Input: React.FC<InputProps> = ({ label, className = '', id, ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className="px-3 py-2 bg-slate-100 text-slate-900 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 placeholder:text-slate-400"
        {...props}
      />
    </div>
  );
};