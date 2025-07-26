
import PersonalInformation from "../components/personal-information";
import Languages from "../components/languages";
import HardSkills from "@/components/hard-skills";
import Skills from "@/components/skills";
import WorkExperience from "@/components/work-experience";
import Education from "@/components/education";

export default function Home() {
  return <div>
    <PersonalInformation />
    <Languages />
    <HardSkills />
    <Skills />
    <WorkExperience />
    <Education />
  </div>;
}
