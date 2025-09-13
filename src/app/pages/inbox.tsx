import { faDollarSign, faBagShopping, faGraduationCap, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailSummary from "../components/emailSummary";

export default function Inbox() {
    return (
      <>
        <h1>AI-Powered Inbox Categories</h1>
        <p>
          Your emails are automatically categorized and converted into actionable tasks across finance, shopping, school, work, and development workflows
        </p>
  
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-300 rounded-md ">
            <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faDollarSign} />
            <p>Finance</p>

            </div>


            <EmailSummary title="Tuition payment due" note="test" value="Due" icon={<FontAwesomeIcon icon={faDollarSign} />}/>
          </div>
          <div className="bg-white border border-gray-300 h-24 rounded-md  ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faBagShopping} />
            <p>Shopping</p>
            </div>
          </div>
          <div className="bg-white border border-gray-300 h-24 rounded-md  ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faGraduationCap} />
            <p>School</p>
            </div>
          </div>
          <div className="bg-white border border-gray-300 h-24 rounded-md  ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faBriefcase} />
            <p>Work</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  