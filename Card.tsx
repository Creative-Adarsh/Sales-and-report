import React from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({ children, className = '', title, description, action }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col print-break-inside-avoid ${className}`}>
      {(title || description || action) && (
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-800 tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
          {action && <div className="ml-4">{action}</div>}
        </div>
      )}
      <div className="p-6 flex-grow">
        {children}
      </div>
    </div>
  );
};
