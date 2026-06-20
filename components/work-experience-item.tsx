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
        <span className="bg-badge text-badge-foreground inline-block rounded px-3 py-1 text-sm">
          {dateRange}
        </span>
      </div>

      {/* Timeline line + dot */}
      <div className="mr-4 flex flex-col items-center">
        <span className="bg-surface h-2 w-2 rounded-full shadow-sm" />
        <span className="bg-border-base mt-2 mb-2 min-h-[120px] w-0.5 flex-grow" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Mobile-only date badge */}
        <span className="bg-badge text-badge-foreground mb-3 inline-block rounded px-3 py-1 text-sm lg:hidden">
          {dateRange}
        </span>

        <h3 className="mb-1 text-xl font-bold">{company}</h3>
        <p className="text-muted mb-4 italic">{role}</p>

        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1 mr-2">•</span>
              <span className="text-sm leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
