import React from 'react';

interface SkillSliderProps {
  skill: string;
  percentage: number;
}

export default function SkillSlider({ skill, percentage }: SkillSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium text-gray-700">{skill}</span>
        <span className="text-lg font-medium text-gray-600">{percentage}%</span>
      </div>

      <div className="relative">
        {/* Background track */}
        <div className="w-full h-2 bg-gray-300 rounded-full"></div>

        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-2 bg-slate-600 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Pointer/handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-slate-700 rounded-full border-2 border-white shadow-md"
          style={{ left: `calc(${percentage}% - 8px)` }}
        ></div>
      </div>
    </div>
  );
}
