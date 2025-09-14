import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation, faFileExport, faCodePullRequest } from "@fortawesome/free-solid-svg-icons"
import { faMessage } from "@fortawesome/free-regular-svg-icons"
export default function Developer() {
    return (
        <>
              <h1 className="text-2xl font-bold mb-2">Developer Productivity Hub</h1>
      <p className="text-gray-600 mb-6">
      GitHub notifications translated into plain English with actionable insights. Warp CLI integration reduces context switching for maximum developer productivity.
      </p>
      <div className="flex justify-evenly">
        <div className="bg-linear-to-bl from-red-500 to-red-600 rounded-md w-1/3 p-8 grid grid-cols-2">
            <div className="col-span-1">
            <h1 className="text-white text-sm col-start-1">Action Required</h1>
            <p className="text-2xl font-bold text-white col-start-1">2</p>
            <p className="text-white text-sm col-start-1">PRs need attention</p>
            </div>

            <div className="flex items-center justify-end col-start-2 ">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-white text-4xl"/> 
            </div>
        </div>
        <div className="bg-linear-to-bl from-gray-500 to-gray-900 rounded-md w-1/3 p-8 grid grid-cols-2">
            <div className="col-span-1">
                <h1 className="text-white text-sm col-start-1">Warm Integration</h1>
                <p className="text-2xl font-bold text-white col-start-1">Active</p>
                <p className="text-white text-sm col-start-1">2 PRs - 3 notifications</p>
            </div>

            <div className="flex items-center justify-end col-start-2 ">
            <h1 className="text-white text-4xl">&gt;_</h1>
            </div>
        </div>
      </div>

      <div className="outline-solid rounded-md p-8 mt-8 mx-8">
        <h1 className=" text-lg">&gt;_ Warp CLI Integration</h1>

        <div className="bg-linear-to-bl from-gray-800 to-gray-900 rounded-md p-4" >
            <p className="text-gray-400"># Smart reminders in your terminal</p>
            <p className="text-green-400"> $ warp remind --github</p>
        <p className="text-yellow-400"> ⚠️ Action required: Fix auth security issues in student-portal PR #42</p>
        <p className="text-green-400">2 PRs ready for review in ecommerce-app</p>
        <p className="text-blue-400">Run &apos;warp open pr&apos; to handle GitHub tasks without context switching</p>
        </div>
        <div className="flex mt-4 gap-x-4">
        <div className="bg-gray-700 text-white rounded-sm p-2">&gt;_ Setup Warp Integration</div>
        <div className="outline-solid rounded-sm p-2">View CLI Commands</div>
        </div>

      </div>
<div className="grid grid-cols-2">
      <div className="outline-solid outline-grey-50 rounded-md p-4 m-4 ">
        <div>
        <FontAwesomeIcon icon={faCodePullRequest} className="text-md"/> 
        <h1 className="text-2xl text-gray-500">GitHub Pull Requests</h1>

        </div>
        <div className="rounded-md outline-solid bg-red-50 outline-red-200 pl-2 mt-4 py-2">
            <p className="text-sm text-red-500">HIGH</p>
            <p className="text-sm">feat: Add user authentication system</p>
            <p className="text-xs text-gray-500">student-portal - by alex-dev</p>
            <div className="rounded-md bg-blue-50 py-4 w-7/8 border-l-6 border-blue-300 pl-2 my-2">
                <p className="text-blue-700 text-semibold">Plain English</p>
            </div>
            <div className="rounded-md bg-red-100 py-4 w-7/8 border-l-6 border-red-300 pl-2">
                <p className="text-red-800 text-sm text-bold">Action Required:</p>
                <p className="text-red-500 text-sm">Fix security vulnerabilities in auth middleware before merge</p>
            </div>
            <div className="flex justify-between p-2">
            <p className="text-xs text-gray-500">2 reviews needed - 5 comments</p>
            <p className="text-xs text-gray-500">Updated 2024-09-10</p>
            </div>
            
            <div className="border-t-2 border-gray-500 w-7/8 items-center my-2"></div>
            <p className="text-xs text-gray-500 mb-2">GitHub notification from notifications@github.com</p>
            <div className="flex gap-x-4">
                <div className="outline-solid outline-gray-200 flex rounded-md bg-white items-center px-2">
                <FontAwesomeIcon icon={faFileExport} className="text-xs"/> 
                <div className="text-xs p-1 text-semibold">Open in GitHub</div>
                </div>
                <div className="outline-solid outline-gray-200 text-xs rounded-md bg-black text-white p-1 px-2 text-semibold">&gt;_ Handle in Warp</div>
            </div>
        </div>
        <div className="rounded-md outline-solid bg-red-50 outline-red-200 pl-2 mt-4 py-2">
            <p className="text-sm text-red-500">HIGH</p>
            <p className="text-sm">feat: Add user authentication system</p>
            <p className="text-xs text-gray-500">student-portal - by alex-dev</p>
            <div className="rounded-md bg-blue-50 py-4 w-7/8 border-l-6 border-blue-300 pl-2 my-2">
                <p className="text-blue-700 text-semibold">Plain English</p>
            </div>
            <div className="rounded-md bg-red-100 py-4 w-7/8 border-l-6 border-red-300 pl-2">
                <p className="text-red-800 text-sm text-bold">Action Required:</p>
                <p className="text-red-500 text-sm">Fix security vulnerabilities in auth middleware before merge</p>
            </div>
            <div className="flex justify-between p-2">
            <p className="text-xs text-gray-500">2 reviews needed - 5 comments</p>
            <p className="text-xs text-gray-500">Updated 2024-09-10</p>
            </div>
            
            <div className="border-t-2 border-gray-500 w-7/8 items-center my-2"></div>
            <p className="text-xs text-gray-500 mb-2">GitHub notification from notifications@github.com</p>
            <div className="flex gap-x-4">
                <div className="outline-solid outline-gray-200 flex rounded-md bg-white items-center px-2">
                <FontAwesomeIcon icon={faFileExport} className="text-xs"/> 
                <div className="text-xs p-1 text-semibold">Open in GitHub</div>
                </div>
                <div className="outline-solid outline-gray-200 text-xs rounded-md bg-black text-white p-1 px-2 text-semibold">&gt;_ Handle in Warp</div>
            </div>
        </div>
        <div className="rounded-md outline-solid outline-gray-200 pl-2 mt-4 py-2">
            <p className="text-sm text-green-500">LOW</p>
            <p className="text-sm">feat: Add user authentication system</p>
            <p className="text-xs text-gray-500">student-portal - by alex-dev</p>
            <div className="rounded-md bg-blue-50 py-4 w-7/8 border-l-6 border-blue-300 pl-2 my-2">
                <p className="text-blue-700 text-semibold">Plain English</p>
            </div>
            <div className="flex justify-between p-2">
            <p className="text-xs text-gray-500">2 reviews needed - 5 comments</p>
            <p className="text-xs text-gray-500">Updated 2024-09-10</p>
            </div>
            
            <div className="border-t-2 border-gray-500 w-7/8 items-center my-2"></div>
            <p className="text-xs text-gray-500 mb-2">GitHub notification from notifications@github.com</p>
            <div className="flex gap-x-4">
                <div className=" outline-solid outline-gray-200 flex rounded-md bg-white items-center px-2">
                <FontAwesomeIcon icon={faFileExport} className="text-xs"/> 
                <div className="text-xs p-1 text-semibold">Open in GitHub</div>
                </div>
                <div className="outline-solid outline-gray-200 text-xs rounded-md bg-black text-white p-1 px-2 text-semibold">&gt;_ Handle in Warp</div>
            </div>
        </div>
      </div>
      <div className="outline-solid outline-grey-50 rounded-md p-4 m-4 ">
        <h1 className="text-2xl text-gray-500">Recent Github Activity</h1>
        <div className="rounded-md outline-solid outline-gray-300 pl-2 mt-4 py-4">
            <div className="flex items-center">
            <FontAwesomeIcon icon={faCodePullRequest} className="text-blue-500 text-sm"/> 
            <p>Review requested on feat: Add user auth</p>
            </div>
            <p className="text-xs text-gray-400">student-portal • Review requested</p>
            <p className="text-xs text-gray-400">9/11/2024, 10:30:00 AM • GitHub &lt; noreply@github.com &gt; </p>
        </div>
        <div className="rounded-md outline-solid outline-gray-300 pl-2 mt-4 py-4">
            <div className="flex items-center">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 text-sm"/> 
            <p>Issue assigned: Database connection timeout</p>
            </div>
            <p className="text-xs text-gray-400">student-portal • Review requested</p>
            <p className="text-xs text-gray-400">9/11/2024, 10:30:00 AM • GitHub &lt; noreply@github.com &gt; </p>
        </div>
        <div className="rounded-md outline-solid outline-gray-300 pl-2 mt-4 py-4">
            <div className="flex items-center">
            <FontAwesomeIcon icon={faMessage} className="text-green-500 text-sm"/> 
            <p>You were mentioned in API Rate Limiting Discussion</p>
            </div>
            <p className="text-xs text-gray-400">student-portal • Review requested</p>
            <p className="text-xs text-gray-400">9/11/2024, 10:30:00 AM • GitHub &lt; noreply@github.com &gt; </p>
        </div>
        <div className="rounded-md bg-gray-200 text-sm outline-gray-300 pl-2 mt-4 py-4">
            <div className="flex items-center">
            <p>💡 Smart Translation: We automatically detect GitHub notifications in your inbox and translate complex technical updates into clear, actionable English summaries.</p>
            </div>
    </div>
        </div>


      </div>
      <div className="bg-linear-to-bl from-gray-800 to-gray-900 rounded-lg p-4 text-white mb-4 w-7/8 mx-auto" >
            <p className="text-xl text-bold ">&lt;&gt; Beyond Code: Communication & Clarity</p>
            <p className="text-center"> While countless developer tools focus on speeding up the act of writing code, our project addresses a later stage of the development lifecycle: communication and clarity.</p>
            <div className="flex gap-x-4 items-center justify-center mt-2">
            <div className="bg-gray-600 rounded-md py-2 px-4 text-white w-2/7" >
                <p className="text-md">Auto-Translation</p>
                <p className="text-sm">GitHub notifications → Plain English summaries</p>
            </div>
            <div className="bg-gray-600 rounded-md py-2 px-4 text-white w-2/7" >
                <p className="text-md">Context Switching</p>
                <p className="text-sm">Handle GitHub tasks directly in Warp terminal</p>
            </div>
            <div className="bg-gray-600 rounded-md py-2 px-4 text-white w-2/7" >
                <p className="text-md">Proactive Reminders</p>
                <p className="text-sm">Never miss a critical PR review or fix</p>
            </div>
            </div>
        </div>
        </>
    )
}