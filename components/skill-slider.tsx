import React from 'react';

interface SkillSliderProps {
  skill: string;
  percentage: number;
}

export default function SkillSlider({ skill, percentage }: SkillSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{skill}</span>
        <span className="text-lg font-medium">{percentage}%</span>
      </div>
      <div className="relative">
        <div className="w-full h-2 bg-track rounded-full" />
        <div
          className="absolute top-0 left-0 h-2 bg-track-fill rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-track-fill rounded-full border-2 border-background shadow-md"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
