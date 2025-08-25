import React from 'react';
import SkillSlider from './skill-slider';

const skills = [
  { skill: 'JavaScript', percentage: 76 },
  { skill: 'React', percentage: 80 },
  { skill: 'TypeScript', percentage: 36 },
  { skill: 'Angular', percentage: 50 },
  { skill: 'Java', percentage: 80 },
  { skill: 'Vue.js', percentage: 80 }
];

export default function HardSkills() {
  return <div className="mx-auto max-w-md">
    <h2 className="mb-4 text-2xl font-bold border-b-1">
      Hard Skills
    </h2>

    <div className="mt-6">
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
