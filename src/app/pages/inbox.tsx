import { faDollarSign, faBagShopping, faGraduationCap, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailSummary from "../components/emailSummary";

export default function Inbox() {
    return (
      <>
        <h1 className="text-2xl font-bold mb-2">AI-Powered Inbox Categories</h1>
        <p>
          Your emails are automatically categorized and converted into actionable tasks across finance, shopping, school, work, and development workflows
        </p>
  
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-300 rounded-md ">
            <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faDollarSign} />
              <p>Finance</p>
            </div>


            <EmailSummary title="Tuition payment due" from="UBC" tag="high" icon={<FontAwesomeIcon icon={faDollarSign} />} note="Your fall semester tuition payment of $2,850 is due by September 15th..."  dueDate="2024-12-19" amount="2341.00"/>
          </div>
          <div className="bg-white border border-gray-300 rounded-md ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faBagShopping} />
            <p>Shopping</p>
            </div>
            <EmailSummary title="Order Confirmation #1001 - TechGear Pro" from="TechGear Pro" tag="medium" icon={<FontAwesomeIcon icon={faDollarSign} />} note="Thank you for your order! Your wireless headphones and phone case will ship soon..." amount="189.99"/>
          </div>
          <div className="bg-white border border-gray-300 rounded-md  ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faGraduationCap} />
            <p>School</p>
            </div>
            <EmailSummary title="Course Registration Reminder" from="Academic Registry" tag="medium" icon={<FontAwesomeIcon icon={faDollarSign} />} note="Registration for winter semester opens tomorrow..."/>
          </div>
          <div className="bg-white border border-gray-300 rounded-md  ">
          <div className="flex items-center ml-4 mr-2 mt-4">
                <FontAwesomeIcon icon={faBriefcase} />
            <p>Work</p>
            </div>
            <EmailSummary title="Tuition payment due" from="UBC" tag="medium" icon={<FontAwesomeIcon icon={faDollarSign} />} note="Your fall semester tuition payment of $2,850 is due by September 15th..."  dueDate="2024-12-19" amount="2341.00"/>
          </div>
        </div>
      </>
    );
  }
  