type DeadlineCardProps = {
    title: string;
    dueIn: string;
    type: string; // ← allow any string
  };
  
  export default function DeadlineCard({ title, dueIn, type }: DeadlineCardProps) {
    const colorMap: Record<string, string> = {
      family: "text-yellow-600",
      friends: "text-pink-500",
      school: "text-blue-600",
      work: "text-purple-600",
      deadline: "text-red-600",
      shopping: "text-green-600",
    };
  
    const colorClass = colorMap[type] || "text-gray-500"; // fallback if type is unknown
  
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className={`text-xs font-medium ${colorClass}`}>{type}</span>
        </div>
        <p className="text-sm text-gray-600">Due in: {dueIn}</p>
      </div>
    );
  }
  