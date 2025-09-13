import OverviewBox from "./overviewBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faClock, faChartLine, faCalendar } from "@fortawesome/free-solid-svg-icons"

export default function Overview() {
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <OverviewBox 
            title="Emails Processed" 
            value="247" 
            note="+12 today" 
            iconColour="text-blue-600" 
            iconBackgroundColour="bg-blue-100"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <OverviewBox 
            title="Urgent Tasks" 
            value="8" 
            note="Need attention" 
            iconColour="text-red-600" 
            iconBackgroundColour="bg-red-100"
            icon={<FontAwesomeIcon icon={faClock} />}
        />
        <OverviewBox 
            title="Financial Insights" 
            value="12" 
            note="Opportunities" 
            iconColour="text-blue-600" 
            iconBackgroundColour="bg-blue-100"
            icon={<FontAwesomeIcon icon={faChartLine} />}
        />
        <OverviewBox 
            title="Active Tracking" 
            value="23" 
            note="Orders + PRs" 
            iconColour="text-purple-600" 
            iconBackgroundColour="bg-purple-100"
            icon={<FontAwesomeIcon icon={faCalendar} />}
        />
        </div>
        </>
    )
}
