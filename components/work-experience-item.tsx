import React from 'react';

interface WorkExperienceItemProps {
  dateRange: string;
  company: string;
  role: string;
  responsibilities: string[];
  isLast?: boolean;
}

export default function WorkExperienceItem({ 
  dateRange, 
  company, 
  role, 
  responsibilities, 
  isLast = false 
}: WorkExperienceItemProps) {
  return (
    <div className="relative flex">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mr-4">
        {/* Timeline dot */}
        <div className="w-3 h-3 rounded-full bg-navy-blue shadow-sm"></div>
        {/* Vertical line - only show if not the last item */}
        {!isLast && (
          <div className="w-0.5 bg-slate-300 flex-grow mt-2 mb-2 min-h-[120px]"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Date badge */}
        <div className="inline-block bg-slate-600 text-white text-sm px-3 py-1 rounded mb-3">
          {dateRange}
        </div>

        {/* Company name */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {company}
        </h3>

        {/* Role */}
        <p className="text-gray-600 italic mb-4">
          {role}
        </p>

        {/* Responsibilities */}
        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <span className="text-slate-600 mr-2 mt-1">•</span>
              <span className="text-gray-700 text-sm leading-relaxed">
                {responsibility}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
