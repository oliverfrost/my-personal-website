import React from 'react';

interface SkillSliderProps {
  skill: string;
  percentage: number;
}

export default function SkillSlider({ skill, percentage }: SkillSliderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-lg font-medium">{skill}</span>
        <span className="text-lg font-medium">{percentage}%</span>
      </div>
      <div className="relative">
        <div className="bg-track h-2 w-full rounded-full" />
        <div
          className="bg-track-fill absolute top-0 left-0 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="bg-track-fill border-background absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 shadow-md"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
