import React from 'react';

interface WorkExperienceItemProps {
  dateRange: string;
  company: string;
  role: string;
  responsibilities: string[];
}

export default function WorkExperienceItem({
  dateRange,
  company,
  role,
  responsibilities,
}: WorkExperienceItemProps) {
  return (
    <div className="relative flex lg:items-start">
      {/* Desktop-only left column: date badge aligned to the timeline */}
      <div className="hidden lg:flex lg:w-48 lg:flex-shrink-0 lg:justify-start lg:pt-1">
        <span className="inline-block bg-badge text-badge-foreground text-sm px-3 py-1 rounded">
          {dateRange}
        </span>
      </div>

      {/* Timeline line + dot */}
      <div className="flex flex-col items-center mr-4">
        <span className="w-2 h-2 rounded-full bg-surface shadow-sm" />
        <span className="w-0.5 bg-border-base flex-grow mt-2 mb-2 min-h-[120px]" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Mobile-only date badge */}
        <span className="lg:hidden inline-block bg-badge text-badge-foreground text-sm px-3 py-1 rounded mb-3">
          {dateRange}
        </span>

        <h3 className="text-xl font-bold mb-1">{company}</h3>
        <p className="text-muted italic mb-4">{role}</p>

        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span className="text-sm leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
