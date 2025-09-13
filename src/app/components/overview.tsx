import OverviewBox from "./overviewBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

import { faEnvelope, faClock, faCalendar } from "@fortawesome/free-regular-svg-icons"
export default function Overview() {
    return (
        <>
        <div className="flex flex-row mt-8">
        <OverviewBox title="Emails Processed" value="247" note="+12 today" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faEnvelope} />}/>
        <OverviewBox title="Urgent Tasks" value="8" note="Critical" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faClock} />}/>
        <OverviewBox title="Financial Insights" value="12" note="Opportunities" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faArrowTrendUp} />}/>
        <OverviewBox title="Active Tracking" value="23" note="Orders" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faCalendar} />}/>
        </div>
        </>
    )
}