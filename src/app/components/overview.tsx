import OverviewBox from "./overviewBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
export default function Overview() {
    return (
        <>
        <div className="flex flex-row mt-8">
        <OverviewBox title="Hi" value="23" note="critical" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faEnvelope} />}/>
        <OverviewBox title="Hi" value="23" note="critical" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faEnvelope} />}/>
        <OverviewBox title="Hi" value="23" note="critical" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faEnvelope} />}/>
        <OverviewBox title="Hi" value="23" note="critical" iconColour="text-blue-500" iconBackgroundColour="bg-red-100"icon={<FontAwesomeIcon icon={faEnvelope} />}/>
        </div>
        </>
    )
}