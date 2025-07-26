import PersonalInformation from '../components/personal-information';
import Languages from '../components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';

export default function Home() {
  return (
    <div>
      <Greeting />
      <PersonalInformation />
      <Languages />
      <HardSkills />
      <Skills />
      <WorkExperience />
      <Education />
    </div>
  );
}
