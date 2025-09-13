import ComputerNetworksIcon from "./icons/computer-networks-icon";
import EducationIcon from "./icons/education-icon";
import FinanceIcon from "./icons/finance";
import HealthcareIcon from "./icons/healthcare-icon";
import InsuranceIcon from "./icons/insurance";
import SeoIcon from "./icons/seo-icon";
import SocialNetworksIcon from "./icons/social-networks-icon";

export default function DomainExpertise() {
    return (
        <div className="w-full">
            <h2 className="mb-4 text-2xl font-bold border-b-1">
                Domain Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                        <FinanceIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Finance</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                       <InsuranceIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Insurance</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                        <HealthcareIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Healthcare</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                       <SocialNetworksIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Social Networks</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                        <EducationIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Education</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                        <SeoIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">SEO</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0">
                        <ComputerNetworksIcon variant="dark" />
                    </div>
                    <span className="text-gray-700 font-medium">Computer Networks</span>
                </div>
            </div>
        </div>
    )
}