import React from 'react';
import SkillSlider from './skill-slider';

const skills = [
  { skill: 'JavaScript', percentage: 86 },
  { skill: 'TypeScript', percentage: 80 },
  { skill: 'Angular', percentage: 80 },
  { skill: 'HTML', percentage: 90 },
  { skill: 'CSS', percentage: 76 },
  { skill: 'React', percentage: 65 },
  { skill: 'Vue.js', percentage: 55 },
  { skill: 'Java', percentage: 50 },
];

export default function HardSkills() {
  return <div className="w-full">
    <h2 className="mb-4 text-2xl font-bold border-b-1 uppercase">
      Hard Skills
    </h2>

    <div className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-6">
      {skills.map((skillData, index) => (
        <SkillSlider
          key={index}
          skill={skillData.skill}
          percentage={skillData.percentage}
        />
      ))}
    </div>
  </div>;
}
