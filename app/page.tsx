import PersonalInformation from '../components/personal-information';
import Languages from '../components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';
import Summary from '@/components/summary';

export default function Home() {
  return (
    <main className='p-4'>
      <Summary />
      <Greeting />
      <PersonalInformation />
      <Languages />
      <HardSkills />
      <Skills />
      <WorkExperience />
      <Education />
    </main>
  );
}
