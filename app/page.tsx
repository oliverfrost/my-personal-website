import PersonalInformation from '../components/personal-information';
import Languages from '../components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';
import Summary from '@/components/summary';
import DomainExpertise from '@/components/domain-expertise';
import ContactForm from '@/components/contact-form';

export default function Home() {
  return (
    <main className='p-4'>
      <Summary className="mb-4" />
      <Greeting />
      <PersonalInformation />
      <Languages />
      <HardSkills />
      <Skills />
      <WorkExperience />
      <Education />
      <DomainExpertise />
      <ContactForm />       
    </main>
  );
}
